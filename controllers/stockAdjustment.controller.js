// import StockAdjustment from "../model/stockAdjustment.model.js"; // path adjust if needed

// /* =========================================================
//    CREATE STOCK ADJUSTMENT  (supports file + form-data)
// ========================================================= */
// export const createStockAdjustment = async (req, res) => {
//   try {
//     let data = req.body;

//     // 📌 If items comes as string (form-data case)
//     if (typeof data.items === "string") {
//       data.items = JSON.parse(data.items);
//     }

//     // 📌 File Upload handle
//     if (req.file) {
//       data.attachment = `/uploads/attachments/${req.file.filename}`;
//     }

//     // 📌 Auto amount = quantity * rate
//     if (data.items && data.items.length > 0) {
//       data.items = data.items.map((item) => ({
//         ...item,
//         amount:
//           item.amount ||
//           (item.quantity && item.rate ? item.quantity * item.rate : 0),
//       }));
//     }

//     const saved = await StockAdjustment.create(data);

//     return res.status(201).json({
//       success: true,
//       message: "Stock Adjustment created successfully",
//       data: saved,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error creating stock adjustment",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    GET ALL
// ========================================================= */
// export const getAllStockAdjustments = async (req, res) => {
//   try {
//     const data = await StockAdjustment.find()
//       .populate("store") // 🔗 LocationMaster
//       .populate("party") // 🔗 Customer (FULL data)
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       message: "Stock Adjustment List",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching list",
//       error: error.message,
//     });
//   }
// };



// /* =========================================================
//    GET SINGLE BY ID
// ========================================================= */
// export const getStockAdjustmentById = async (req, res) => {
//   try {
//     const data = await StockAdjustment.findById(req.params.id);

//     if (!data) {
//       return res.status(404).json({ success: false, message: "Not found" });
//     }

//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching data",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    UPDATE STOCK ADJUSTMENT (Supports new file + items JSON)
// ========================================================= */
// export const updateStockAdjustment = async (req, res) => {
//   try {
//     let data = req.body;

//     // 📌 If items JSON string me aaye
//     if (typeof data.items === "string") {
//       data.items = JSON.parse(data.items);
//     }

//     // 📌 File replace hua to update file path
//     if (req.file) {
//       data.attachment = `/uploads/attachments/${req.file.filename}`;
//     }

//     // 📌 Amount recalc
//     if (data.items && data.items.length > 0) {
//       data.items = data.items.map((item) => ({
//         ...item,
//         amount:
//           item.amount ||
//           (item.quantity && item.rate ? item.quantity * item.rate : 0),
//       }));
//     }

//     const updated = await StockAdjustment.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true, runValidators: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Stock Adjustment updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error updating",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    DELETE
// ========================================================= */
// export const deleteStockAdjustment = async (req, res) => {
//   try {
//     const deleted = await StockAdjustment.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Stock Adjustment deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error deleting",
//       error: error.message,
//     });
//   }
// };



import StockAdjustment from "../model/stockAdjustment.model.js";
import StoreStock from "../model/StoreStock.model.js";
import ItemMaster from "../model/itemMaster.model.js";

// Auto Voucher Generator
// const generateVoucherNo = async () => {
//   const last = await StockAdjustment.findOne().sort({ createdAt: -1 });
//   if (!last) return "00001";

//   const num = parseInt(last.voucherNo) + 1;
//   return num.toString().padStart(5, "0");
// };

// CREATE STOCK ADJUSTMENT
// export const createStockAdjustment = async (req, res) => {
//   try {
//     const { category, store, party, voucherDate, items, remarks } = req.body;

//     if (!category || !store || !party || !voucherDate || !items?.length) {
//       return res.status(400).json({ message: "All required fields missing" });
//     }

//     const voucherNo = await generateVoucherNo();

//     // Process each item
//     for (const row of items) {
//       const { itemcode, quantity, rate, adjustmentType } = row;

//       if (!itemcode || !quantity || !rate || !adjustmentType) {
//         return res.status(400).json({ message: "Invalid item row data" });
//       }

//       const itemData = await ItemMaster.findOne({ code: itemcode });

//       if (!itemData) {
//         return res.status(404).json({ message: `Item not found: ${itemcode}` });
//       }

//       let storeStock = await StoreStock.findOne({
//         item: itemData._id,
//         store,
//       });

//       if (!storeStock) {
//         storeStock = new StoreStock({
//           item: itemData._id,
//           store,
//           quantity: 0,
//         });
//       }

//       // STOCK LOGIC
//       if (adjustmentType === "RECEIPT") {
//         storeStock.quantity += Number(quantity);
//       }

//       if (adjustmentType === "ISSUE") {
//         if (storeStock.quantity < quantity) {
//           return res.status(400).json({
//             message: `Insufficient stock for ${itemData.name}`,
//           });
//         }
//         storeStock.quantity -= Number(quantity);
//       }

//       await storeStock.save();

//       // Save snapshot in voucher
//       row.description = itemData.name;
//       row.amount = quantity * rate;
//       row.itemBalance = storeStock.quantity;
//     }

//     const stockAdjustment = new StockAdjustment({
//       category,
//       store,
//       party,
//       voucherDate,
//       voucherNo,
//       items,
//       remarks,
//       attachment: req.file?.path,
//     });

//     await stockAdjustment.save();

//     return res.status(201).json({
//       success: true,
//       message: "Stock adjustment saved successfully",
//       data: stockAdjustment,
//     });
//   } catch (error) {
//     console.error("Stock Adjustment Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


const generateVoucherNo = async () => {
  const last = await StockAdjustment.findOne().sort({ createdAt: -1 });
  if (!last) return "SA00001";
  return (
    "SA" +
    (parseInt(last.voucherNo.replace("SA", "")) + 1).toString().padStart(5, "0")
  );
};



export const createStockAdjustment = async (req, res) => {
  try {
    const { store, voucherDate, items, remarks } = req.body;

    if (!store || !voucherDate || !items?.length) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const voucherNo = await generateVoucherNo();

    for (const row of items) {
      const { itemcode, quantity, adjustmentType, reason } = row;

      const item = await ItemMaster.findOne({ code: itemcode });
      if (!item)
        return res.status(404).json({ message: `Item not found: ${itemcode}` });

      let stock = await StoreStock.findOne({ item: item._id, store });
      if (!stock)
        stock = new StoreStock({ item: item._id, store, quantity: 0 });

      if (adjustmentType === "ISSUE" && stock.quantity < quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${item.name}` });
      }

      if (adjustmentType === "RECEIPT") stock.quantity += Number(quantity);
      if (adjustmentType === "ISSUE") stock.quantity -= Number(quantity);

      await stock.save();

      row.item = item._id;
      row.rate = item.purchase_rate || 0;
      row.amount = row.rate * quantity;
    }

    const adjustment = await StockAdjustment.create({
      voucherNo,
      store,
      voucherDate,
      items,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Stock adjustment completed",
      data: adjustment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStockAdjustments = async (req, res) => {
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

    const data = await StockAdjustment.find(filter)
      .populate("store", "name code")
      // .populate("party", "name")
      .populate("items.item", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStockAdjustmentById = async (req, res) => {
  try {
    const data = await StockAdjustment.findById(req.params.id)
      .populate("store", "name code")
      .populate("party", "name")
      .populate("items.item", "name code");

    if (!data) {
      return res.status(404).json({ message: "Stock Adjustment not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getStockAdjustmentByVoucher = async (req, res) => {
  try {
    const { voucherNo } = req.params;

    const data = await StockAdjustment.findOne({ voucherNo })
      .populate("store", "name code")
      .populate("party", "name")
      .populate("items.item", "name code");

    if (!data) {
      return res.status(404).json({ message: "Voucher not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const reverseStockAdjustment = async (req, res) => {
  try {
    const adjustment = await StockAdjustment.findById(req.params.id);

    if (!adjustment) {
      return res.status(404).json({ message: "Adjustment not found" });
    }

    for (const row of adjustment.items) {
      const storeStock = await StoreStock.findOne({
        item: row.item,
        store: adjustment.store,
      });

      if (!storeStock) continue;

      if (row.adjustmentType === "RECEIPT") {
        storeStock.quantity -= row.quantity;
      }

      if (row.adjustmentType === "ISSUE") {
        storeStock.quantity += row.quantity;
      }

      await storeStock.save();
    }

    await StockAdjustment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Stock adjustment reversed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
