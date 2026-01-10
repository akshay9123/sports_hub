import OpeningStock from "../model/OpeningStock.model.js";
import StoreStock from "../model/StoreStock.model.js";
import ItemMaster from "../model/itemMaster.model.js";

// Voucher Generator
const generateVoucherNo = async () => {
  const last = await OpeningStock.findOne().sort({ createdAt: -1 });
  if (!last) return "OS0001";

  const num = parseInt(last.voucherNo.replace("OS", "")) + 1;
  return "OS" + num.toString().padStart(4, "0");
};

// CREATE OPENING STOCK
export const createOpeningStock = async (req, res) => {
  try {
    const { store, voucherDate, items, remarks } = req.body;

    if (!store || !voucherDate || !items?.length) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const voucherNo = await generateVoucherNo();

    for (const row of items) {
      const { itemcode, quantity, rate } = row;

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
    return res.status(500).json({ message: "Server error" });
  }
};




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