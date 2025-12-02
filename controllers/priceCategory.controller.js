import PriceCategory from "../model/priceCategory.model.js";

// **********************************************
// CREATE (POST)
// **********************************************
export const createPriceCategory = async (req, res) => {
  try {
    const { code, name } = req.body;

    const newCategory = new PriceCategory({
      code, // manual allowed, auto-generate allowed
      name,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Price Category Created Successfully",
      data: newCategory,
    });
  } catch (error) {
    // Duplicate Code Error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Code already exists. Please use a unique code.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// **********************************************
// GET ALL (GET)
// **********************************************
export const getAllPriceCategories = async (req, res) => {
  try {
    const categories = await PriceCategory.find().sort({ code: 1 });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// **********************************************
// UPDATE (PUT)
// **********************************************
export const updatePriceCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;

    const category = await PriceCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found",
      });
    }

    // If code is changed → check unique
    if (code && code !== category.code) {
      const exists = await PriceCategory.findOne({ code });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Code already exists. Please use a unique code.",
        });
      }
      category.code = code;
    }

    if (name) category.name = name;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Price Category Updated Successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// **********************************************
// DELETE (DELETE)
// **********************************************
export const deletePriceCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PriceCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Price Category Deleted Successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// GET THE SPECIFIC PRICE CATEGORY WITH THE HELP OF THE ID
export const getSpecificPriceCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await PriceCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



// GET THE PRICE CATEGORY WITH THE HELP OF THE CODE
export const getPriceCategoryByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const category = await PriceCategory.findOne({ code });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found with this code",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
