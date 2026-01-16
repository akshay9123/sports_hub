import PurchaseBill from "../model/PurchaseBill.model.js";
import StoreStock from "../model/StoreStock.model.js";
import BatchStock from "../model/batchStock.model.js";
import ItemMaster from "../model/itemMaster.model.js";

// Bill No Generator
const generateBillNo = async () => {
  const last = await PurchaseBill.findOne().sort({ createdAt: -1 });
  if (!last) return "PB0001";

  const num = parseInt(last.billNo.replace("PB", "")) + 1;
  return "PB" + num.toString().padStart(4, "0");
};

export const createPurchaseBill = async (req, res) => {
  try {
    const { store, vendor, billDate, items, logistics, remarks } = req.body;

    if (!store || !vendor || !billDate || !items?.length) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const billNo = await generateBillNo();

    for (const row of items) {
      const { itemcode, quantity, rate, batchNo } = row;

      if (!itemcode || !quantity || !rate) {
        return res.status(400).json({ message: "Invalid item data" });
      }

      const item = await ItemMaster.findOne({ code: itemcode });
      if (!item) {
        return res.status(404).json({ message: `Item not found: ${itemcode}` });
      }

      // 1. Update StoreStock (Total Qty)
      let storeStock = await StoreStock.findOne({ item: item._id, store });

      if (!storeStock) {
        storeStock = new StoreStock({ item: item._id, store, quantity: 0 });
      }

      storeStock.quantity += Number(quantity);
      await storeStock.save();

      // 2. FIFO Batch Insert
      const batchKey = batchNo || `PUR-${billNo}`;

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
          receivedDate: billDate,
        });
      }

      // 3. Required fields for PurchaseBill schema
      row.item = item._id;
      row.description = item.name;
      row.amount = quantity * rate;
      row.itemBalance = storeStock.quantity;
    }

    const purchase = await PurchaseBill.create({
      billNo,
      billDate,
      store,
      vendor,
      items,
      logistics,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Purchase Bill created successfully (FIFO)",
      data: purchase,
    });
  } catch (error) {
    console.error("Purchase Bill Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
