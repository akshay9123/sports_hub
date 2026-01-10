import ItemMaster from "../model/itemMaster.model.js";
import StoreStock from "../model/StoreStock.model.js";

export const getItemsWithStock = async (req, res) => {
  try {
    const { store } = req.query;

    if (!store) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const items = await ItemMaster.find().lean();

    const stockData = await StoreStock.find({ store }).lean();

    const stockMap = {};
    stockData.forEach((s) => {
      stockMap[s.item.toString()] = s.quantity;
    });

    const result = items.map((item) => ({
      ...item,
      stock: stockMap[item._id.toString()] || 0,
    }));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getLowStockItems = async (req, res) => {
  try {
    const { store } = req.query;

    if (!store) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const items = await ItemMaster.find({
      minimum_level: { $gt: 0 },
    }).lean();

    const stockData = await StoreStock.find({ store }).lean();

    const stockMap = {};
    stockData.forEach((s) => {
      stockMap[s.item.toString()] = s.quantity;
    });

    const lowStock = items
      .map((item) => ({
        ...item,
        stock: stockMap[item._id.toString()] || 0,
      }))
      .filter((item) => item.stock <= item.minimum_level);

    res.status(200).json({
      success: true,
      data: lowStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getItemStockSummary = async (req, res) => {
  try {
    const { itemId } = req.params;

    const stock = await StoreStock.find({ item: itemId }).populate(
      "store",
      "name code"
    );

    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
