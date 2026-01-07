import ItemMaster from "../model/itemMaster.model.js";
import fs from "fs";
import path from "path";

// Create Item
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




// Get Single Item by ID
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


// Update Item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // ❌ never allow code update
    delete updateData.code;

    const item = await ItemMaster.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Attachment update
    if (req.file) {
      // delete old attachment
      if (item.attachment) {
        const oldPath = path.join(process.cwd(), item.attachment);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
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



// Delete Item
export const deleteItem = async (req, res) => {
  try {
    const item = await ItemMaster.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // delete attachment if exists
    if (item.attachment) {
      const filePath = path.join(process.cwd(), item.attachment);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
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



// Get Item By Code
export const getItemByCode = async (req, res) => {
  try {
    const { code } = req.params;

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

