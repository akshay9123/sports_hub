import OpeningStock from "../model/OpeningStock.model.js";
import StoreStock from "../model/StoreStock.model.js";
import BatchStock from "../model/batchStock.model.js";
import ItemMaster from "../model/itemMaster.model.js";
import mongoose from "mongoose";


// Voucher Generator
const generateVoucherNo = async () => {
  const last = await OpeningStock.findOne().sort({ createdAt: -1 });
  if (!last) return "OS0001";

  const num = parseInt(last.voucherNo.replace("OS", "")) + 1;
  return "OS" + num.toString().padStart(4, "0");
};

// CREATE OPENING STOCK
// export const createOpeningStock = async (req, res) => {
//   try {
//     const { store, voucherDate, items, remarks } = req.body;

//     if (!store || !voucherDate || !items?.length) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const voucherNo = await generateVoucherNo();

//     for (const row of items) {
//       const { itemcode, quantity, rate } = row;

//       if (!itemcode || !quantity || !rate) {
//         return res.status(400).json({ message: "Invalid item data" });
//       }

//       const item = await ItemMaster.findOne({ code: itemcode });

//       if (!item) {
//         return res.status(404).json({ message: `Item not found: ${itemcode}` });
//       }

//       let storeStock = await StoreStock.findOne({
//         item: item._id,
//         store,
//       });

//       if (!storeStock) {
//         storeStock = new StoreStock({
//           item: item._id,
//           store,
//           quantity: 0,
//         });
//       }

//       // OPENING STOCK = ALWAYS RECEIPT
//       storeStock.quantity += Number(quantity);

//       await storeStock.save();

//       row.description = item.name;
//       row.amount = quantity * rate;
//       row.itemBalance = storeStock.quantity;
//     }

//     const openingStock = new OpeningStock({
//       store,
//       voucherDate,
//       voucherNo,
//       items,
//       remarks,
//     });

//     await openingStock.save();

//     return res.status(201).json({
//       success: true,
//       message: "Opening stock saved successfully",
//       data: openingStock,
//     });
//   } catch (error) {
//     console.error("Opening Stock Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// export const createOpeningStock = async (req, res) => {
//   try {
//     const { store, voucherDate, items, remarks } = req.body;

//     if (!store || !voucherDate || !items?.length) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const voucherNo = await generateVoucherNo();

//     for (const row of items) {
//       const { itemcode, quantity, rate, batchNo } = row;

//       if (!itemcode || !quantity || !rate) {
//         return res.status(400).json({ message: "Invalid item data" });
//       }

//       const item = await ItemMaster.findOne({ code: itemcode });

//       if (!item) {
//         return res.status(404).json({ message: `Item not found: ${itemcode}` });
//       }

//       let storeStock = await StoreStock.findOne({
//         item: item._id,
//         store,
//       });

//       if (!storeStock) {
//         storeStock = new StoreStock({
//           item: item._id,
//           store,
//           quantity: 0,
//         });
//       }

//       // OPENING STOCK = ALWAYS RECEIPT
//       storeStock.quantity += Number(quantity);
//       await storeStock.save();

//       // ✅ FIFO / BATCH SUPPORT (ADDED, NOT MODIFIED)
//       await BatchStock.create({
//         item: item._id,
//         store,
//         batchNo: batchNo || `OPENING-${voucherNo}`,
//         quantity: Number(quantity),
//         rate: Number(rate),
//         receivedDate: voucherDate,
//       });

//       row.description = item.name;
//       row.amount = quantity * rate;
//       row.itemBalance = storeStock.quantity;
//     }

//     const openingStock = new OpeningStock({
//       store,
//       voucherDate,
//       voucherNo,
//       items,
//       remarks,
//     });

//     await openingStock.save();

//     return res.status(201).json({
//       success: true,
//       message: "Opening stock saved successfully",
//       data: openingStock,
//     });
//   } catch (error) {
//     console.error("Opening Stock Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// export const getOpeningStock = async (req, res) => {
//   try {
//     const { store, fromDate, toDate } = req.query;

//     const filter = {};

//     if (store) filter.store = store;

//     if (fromDate && toDate) {
//       filter.voucherDate = {
//         $gte: new Date(fromDate),
//         $lte: new Date(toDate),
//       };
//     }

//     const data = await OpeningStock.find(filter)
//       .populate("store", "name code")
//       .sort({ voucherDate: -1 });

//     return res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });
//   } catch (error) {
//     console.error("Get Opening Stock Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


export const createOpeningStock = async (req, res) => {
  try {
    const { store, voucherDate, items, remarks } = req.body;

    if (!store || !voucherDate || !items?.length) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const voucherNo = await generateVoucherNo();

    for (const row of items) {
      const { itemcode, quantity, rate, batchNo } = row;

      if (!itemcode || !quantity || !rate) {
        return res.status(400).json({ message: "Invalid item data" });
      }

      const item = await ItemMaster.findOne({ code: itemcode });

      if (!item) {
        return res.status(404).json({ message: `Item not found: ${itemcode}` });
      }

      let storeStock = await StoreStock.findOne({
        item: item._id,
        store,
      });

      if (!storeStock) {
        storeStock = new StoreStock({
          item: item._id,
          store,
          quantity: 0,
        });
      }

      // OPENING STOCK = ALWAYS RECEIPT
      storeStock.quantity += Number(quantity);
      await storeStock.save();

      // =========================
      // BATCH STOCK (SAFE UPSERT)
      // =========================
      const batchKey = batchNo || `OPENING-${voucherNo}`;

      const existingBatch = await BatchStock.findOne({
        item: item._id,
        store,
        batchNo: batchKey,
      });

      if (existingBatch) {
        existingBatch.quantity += Number(quantity);
        await existingBatch.save();
      } else {
        await BatchStock.create({
          item: item._id,
          store,
          batchNo: batchKey,
          quantity: Number(quantity),
          rate: Number(rate),
          receivedDate: voucherDate,
        });
      }

      // =========================
      // REQUIRED FIELDS FOR MODEL
      // =========================
      row.item = item._id; // ✅ REQUIRED
      row.description = item.name;
      row.amount = quantity * rate;
      row.itemBalance = storeStock.quantity;
    }

    const openingStock = new OpeningStock({
      store,
      voucherDate,
      voucherNo,
      items,
      remarks,
    });

    await openingStock.save();

    return res.status(201).json({
      success: true,
      message: "Opening stock saved successfully",
      data: openingStock,
    });
  } catch (error) {
    console.error("Opening Stock Error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// GET OPENING STOCK
export const getOpeningStock = async (req, res) => {
  try {
    const { store, fromDate, toDate } = req.query;

    const filter = {};

    if (store) filter.store = store;

    if (fromDate && toDate) {
      filter.voucherDate = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const data = await OpeningStock.find(filter)
      .populate("store", "name code")
      .sort({ voucherDate: -1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Get Opening Stock Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getItemsByStoreId = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const items = await StoreStock.find({ store: storeId })
      .populate("item", "name code category unit")
      .sort({ "item.name": 1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Get Items By Store Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const rebuildBatchStock = async (req, res) => {
  try {
    // 1. Clear existing batch stock (optional but recommended for clean rebuild)
    await BatchStock.deleteMany({});

    // 2. Read all Opening Stock vouchers
    const openingStocks = await OpeningStock.find();

    for (const voucher of openingStocks) {
      const { store, voucherDate, voucherNo, items } = voucher;

      for (const row of items) {
        const batchKey = row.batchNo || `OPENING-${voucherNo}`;

        await BatchStock.create({
          item: row.item,
          store,
          batchNo: batchKey,
          quantity: row.quantity,
          rate: row.rate,
          receivedDate: voucherDate,
        });
      }
    }

    return res.json({
      success: true,
      message: "BatchStock rebuilt successfully from OpeningStock",
    });
  } catch (error) {
    console.error("Rebuild Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getOpeningStockByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const records = await OpeningStock.find({ store: storeId })
      .populate("store", "name code")
      .populate("items.item")
      .sort({ voucherDate: 1 });

    if (!records.length) {
      return res.status(404).json({ message: "No opening stock found" });
    }

    // Merge all items into one array
    const mergedItems = records.flatMap((r) => r.items);

    return res.status(200).json({
      success: true,
      store: records[0].store,
      totalVouchers: records.length,
      totalItems: mergedItems.length,
      items: mergedItems,
    });
  } catch (error) {
    console.error("Get Opening Stock By Store Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getItemsByStoreFromBatch = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: "Store ID is required",
      });
    }

    const items = await BatchStock.aggregate([
      {
        $match: {
          store: new mongoose.Types.ObjectId(storeId),
          quantity: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: "$item",
          totalQty: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "itemmasters", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      { $unwind: "$itemDetails" },
      {
        $project: {
          _id: 0,
          itemId: "$_id",
          itemName: "$itemDetails.name",
          itemCode: "$itemDetails.itemcode",
          totalQty: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Get Items By Store Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

