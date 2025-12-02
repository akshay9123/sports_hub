import StockUnit from "../model/stockUnit.model.js";

const generateNextCode = async () => {
  // Find last saved ItemGroup sorted by code (descending)
  const lastItem = await StockUnit.findOne().sort({ code: -1 });

  if (!lastItem || !lastItem.code) {
    return "0001";
  }

  let lastCode = parseInt(lastItem.code); // "0021" -> 21
  let newCode = (lastCode + 1).toString().padStart(4, "0"); // -> "0022"

  return newCode;
};


// CREATE STOCK UNIT
export const createStockUnit = async (req, res) => {
  try {
    const newCode = await generateNextCode();

    const newItem = new StockUnit({
      ...req.body,
      code: newCode,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: "Stock Unit created successfully",
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



// GET ALL STOCK UNITS
export const getAllStockUnits = async (req, res) => {
  try {
    const items = await StockUnit.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



// GET STOCK UNIT BY ID
export const getStockUnit = async (req, res) => {
  try {
    const item = await StockUnit.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Stock Unit not found",
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



// UPDATE STOCK UNIT
export const updateStockUnit = async (req, res) => {
  try {
    const updated = await StockUnit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Stock Unit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock Unit updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



// DELETE STOCK UNIT
export const deleteStockUnit = async (req, res) => {
  try {
    const deleted = await StockUnit.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Stock Unit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock Unit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



// GET STOCK UNIT BY CODE
export const getStockUnitByCode = async (req, res) => {
  try {
    const item = await StockUnit.findOne({ code: req.params.code });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Stock Unit with this code not found",
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