import ItemMaster from "../model/itemMaster.model.js";
import fs from "fs";
import path from "path";

/* =========================
   CREATE ITEM
========================= */
export const createItem = async (req, res) => {
  try {
    const data = req.body;

    const item = new ItemMaster({
      ...data,
      attachment: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL ITEMS (Opening Stock / Adjustment UI)
========================= */
export const getAllItems = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, brand } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
        { barcode: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (brand) query.brand = brand;

    const items = await ItemMaster.find(query)
      .populate("under_group", "item_name code")
      .populate("stock_unit", "code name uqc")
      .populate("category", "name code")
      .populate("brand", "name code")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

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

/* =========================
   GET ITEM BY ID
========================= */
export const getItemById = async (req, res) => {
  try {
    const item = await ItemMaster.findById(req.params.id)
      .populate("under_group", "item_name code")
      .populate("stock_unit", "code name uqc")
      .populate("category", "name code")
      .populate("brand", "name code");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
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

/* =========================
   UPDATE ITEM (NO STOCK TOUCH)
========================= */
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Never allow code update
    delete updateData.code;

    const item = await ItemMaster.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Handle attachment
    if (req.file) {
      if (item.attachment) {
        const oldPath = path.join(process.cwd(), item.attachment);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.attachment = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await ItemMaster.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE ITEM
========================= */
export const deleteItem = async (req, res) => {
  try {
    const item = await ItemMaster.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.attachment) {
      const filePath = path.join(process.cwd(), item.attachment);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await ItemMaster.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ITEM BY CODE / BARCODE
   (Used in Opening Stock & Adjustment)
========================= */
export const getItemByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const item = await ItemMaster.findOne({
      $or: [
        { code: { $regex: `^${code}$`, $options: "i" } },
        { barcode: { $regex: `^${code}$`, $options: "i" } },
      ],
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found with this code/barcode",
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



// GET REQUEST FOR SUGGESTED CATEGORY ITEM BY ID
export const getSuggestedItems = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Item ID",
      });
    }

    // Fetch item with suggested categories populated
    const item = await ItemMaster.findById(itemId)
      .populate("suggested_cat.itemId") // Populate suggested items
      .select("name suggested_cat");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      itemName: item.name,
      suggestedItems: item.suggested_cat.map((s) => s.itemId),
    });
  } catch (error) {
    console.error("Get Suggested Items Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};