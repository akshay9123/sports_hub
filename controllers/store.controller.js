import PriceCategory from "../model/priceCategory.model.js";
import Store from "../model/store.model.js";

// **********************************************
// CREATE (POST)
// **********************************************
export const createStore = async (req, res) => {
  try {
    const { code, name } = req.body;

    const newStore = new Store({
      code, // manual allowed, auto-generate allowed
      name,
    });

    await newStore.save();

    res.status(201).json({
      success: true,
      message: "Price Category Created Successfully",
      data: newStore,
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
export const getAllStore = async (req, res) => {
  try {
    const stores = await Store.find().sort({ code: 1 });

    res.status(200).json({
      success: true,
      data: stores,
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
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;

    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found",
      });
    }

    // If code is changed → check unique
    if (code && code !== store.code) {
      const exists = await Store.findOne({ code });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Code already exists. Please use a unique code.",
        });
      }
      store.code = code;
    }

    if (name) store.name = name;

    await store.save();

    res.status(200).json({
      success: true,
      message: "Price Category Updated Successfully",
      data: store,
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
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Store.findByIdAndDelete(id);

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
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: store,
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
export const getStoreByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const store = await Store.findOne({ code });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Price Category not found with this code",
      });
    }

    res.status(200).json({
      success: true,
      data: store,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
