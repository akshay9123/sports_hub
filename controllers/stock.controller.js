import StoreStock from "../model/StoreStock.model.js";
import ItemMaster from "../model/itemMaster.model.js";

/* =========================
   1. Get Stock By Store
========================= */
export const getStockByStore = async (req, res) => {
  try {
    const { store } = req.query;

    if (!store) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const stock = await StoreStock.find({ store })
      .populate("item", "name code barcode")
      .populate("store", "name code");

    res.status(200).json({
      success: true,
      count: stock.length,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   2. Get Stock By Item (All Stores)
========================= */
export const getStockByItem = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   3. Get Single Stock Row
========================= */
export const getStockByStoreAndItem = async (req, res) => {
  try {
    const { storeId, itemId } = req.params;

    const stock = await StoreStock.findOne({
      store: storeId,
      item: itemId,
    })
      .populate("item", "name code")
      .populate("store", "name code");

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found for this item in this store",
      });
    }

    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   4. Get Stock By Item Code
========================= */
export const getStockByItemCode = async (req, res) => {
  try {
    const { store, code } = req.query;

    if (!store || !code) {
      return res.status(400).json({
        success: false,
        message: "Store and item code are required",
      });
    }

    const item = await ItemMaster.findOne({ code });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const stock = await StoreStock.findOne({
      store,
      item: item._id,
    });

    res.status(200).json({
      success: true,
      data: {
        item: item.name,
        code: item.code,
        stock: stock ? stock.quantity : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
