import ItemMaster from "../model/itemMaster.model.js";


// Create Item
export const createItem = async (req, res) => {
  try {
    const item = new ItemMaster(req.body);

    if (req.file) {
      item.attachment = req.file.path; // if you're using multer for file uploads
    }

    await item.save();
    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Items (with optional filtering + pagination)
export const getAllItems = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, brand } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (brand) query.brand = brand;

    const items = await ItemMaster.find(query)
      .populate("under_group", "item_name code")     // 🔗 ItemGroup
      .populate("stock_unit", "code name uqc")       // 🔗 StockUnit
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ItemMaster.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get Single Item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await ItemMaster.findById(req.params.id);

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Item
export const updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ❌ prevent code from being updated
    if ("code" in updateData) {
      delete updateData.code;
    }

    // file update allowed
    if (req.file) {
      updateData.attachment = req.file.path;
    }

    const updatedItem = await ItemMaster.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete Item
export const deleteItem = async (req, res) => {
  try {
    const item = await ItemMaster.findByIdAndDelete(req.params.id);

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Item By Code
export const getItemByCode = async (req, res) => {
  try {
    const { code } = req.params;

    // Item find by exact code (case-insensitive)
    const item = await ItemMaster.findOne({
      code: { $regex: `^${code}$`, $options: "i" },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found with this code",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
