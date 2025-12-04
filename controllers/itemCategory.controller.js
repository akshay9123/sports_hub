import ItemCategory from "../model/itemCategory.model.js";

// ================= CREATE =================
export const createItemCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = new ItemCategory({
      name,
      image: req.file ? `/uploads/${req.file.filename}` : null, // image store
    });

    const saved = await newCategory.save();
    return res
      .status(201)
      .json({ success: true, message: "Category created", data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ ALL =================
export const getAllItemCategories = async (req, res) => {
  try {
    const categories = await ItemCategory.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ SINGLE =================
export const getItemCategory = async (req, res) => {
  try {
    const category = await ItemCategory.findById(req.params.id);

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE =================
export const updateItemCategory = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;  // code ko intentionally ignore kar rahe hain

    // Agar new image aayi to update karo
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updated = await ItemCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    return res.status(200).json({
      success: true,
      message: "Category updated",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ================= DELETE =================
export const deleteItemCategory = async (req, res) => {
  try {
    const deleted = await ItemCategory.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ================= READ BY CODE =================
export const getItemCategoryByCode = async (req, res) => {
  try {
    const category = await ItemCategory.findOne({ code: req.params.code });

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
