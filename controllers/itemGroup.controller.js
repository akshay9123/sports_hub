import ItemGroup from "../model/itemGroup.model.js";

// Function to generate next code
const generateNextCode = async () => {
  // Find last saved ItemGroup sorted by code (descending)
  const lastItem = await ItemGroup.findOne().sort({ code: -1 });

  if (!lastItem || !lastItem.code) {
    return "0001";
  }

  let lastCode = parseInt(lastItem.code); // "0021" -> 21
  let newCode = (lastCode + 1).toString().padStart(4, "0"); // -> "0022"

  return newCode;
};

// CREATE ITEM GROUP
export const createItemGroup = async (req, res) => {
  try {
    const newCode = await generateNextCode(); // auto-generated code

    const newItem = new ItemGroup({
      ...req.body,
      code: newCode,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: "Item Group created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET ALL ITEM GROUPS
export const getAllItemGroups = async (req, res) => {
  try {
    const items = await ItemGroup.find()
      .populate("stock_unit", "code name uqc desc roundoff_decimal")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch item groups",
      error: error.message,
    });
  }
};

// GET SINGLE ITEM BY ID
export const getItemGroup = async (req, res) => {
  try {
    const item = await ItemGroup.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE ITEM
export const updateItemGroup = async (req, res) => {
  try {
    const item = await ItemGroup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE ITEM
export const deleteItemGroup = async (req, res) => {
  try {
    const item = await ItemGroup.findByIdAndDelete(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getItemGroupByCode = async (req, res) => {
  try {
    const item = await ItemGroup.findOne({ code: req.params.code });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item with this code not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
