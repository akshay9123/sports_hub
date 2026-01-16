import { fifoDeduct } from "../config/fifoDeduction.js";
import BatchStock from "../model/batchStock.model.js";
import InterBranchTransfer from "../model/interBranchTransfer.model.js";
import StoreStock from "../model/storeStock.model.js";


/**
 * CREATE INTER BRANCH TRANSFER
 */
// export const createIBT = async (req, res) => {
//   try {
//     const { transferDate, fromStore, toStore, items, remarks } = req.body;

//     if (fromStore === toStore) {
//       return res.status(400).json({
//         success: false,
//         message: "Source and destination store cannot be the same",
//       });
//     }

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "At least one item is required",
//       });
//     }

//     // 1. CHECK STOCK AVAILABILITY
//     for (const row of items) {
//       const stock = await StoreStock.findOne({
//         store: fromStore,
//         item: row.item,
//       });

//       if (!stock || stock.quantity < row.quantity) {
//         return res.status(400).json({
//           success: false,
//           message: "Insufficient stock for one or more items",
//         });
//       }
//     }

//     // 2. CREATE IBT DOCUMENT
//     const ibt = await InterBranchTransfer.create({
//       transferDate,
//       fromStore,
//       toStore,
//       items,
//       remarks,
//       createdBy: req.user?._id,
//     });

//     // 3. UPDATE STOCK (DEBIT + CREDIT)
//     for (const row of items) {
//       // Deduct from source
//       await StoreStock.findOneAndUpdate(
//         { store: fromStore, item: row.item },
//         { $inc: { quantity: -row.quantity } },
//         { new: true }
//       );

//       // Add to destination
//       await StoreStock.findOneAndUpdate(
//         { store: toStore, item: row.item },
//         { $inc: { quantity: row.quantity } },
//         { upsert: true, new: true }
//       );
//     }

//     res.status(201).json({
//       success: true,
//       message: "Inter Branch Transfer completed successfully",
//       data: ibt,
//     });
//   } catch (error) {
//     console.error("IBT Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

const generateTransferNo = async () => {
  const last = await InterBranchTransfer.findOne().sort({ createdAt: -1 });

  if (!last || !last.transferNo) return "IBT0001";

  const num = parseInt(last.transferNo.replace("IBT", "")) + 1;
  return "IBT" + num.toString().padStart(4, "0");
};


export const createIBT = async (req, res) => {
  try {
    const { transferDate, fromStore, toStore, items, remarks } = req.body;

    if (fromStore === toStore) {
      return res.status(400).json({
        success: false,
        message: "Source and destination store cannot be the same",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    // 1. STOCK AVAILABILITY CHECK
    for (const row of items) {
      if (!row.rate || !row.amount) {
        return res.status(400).json({
          success: false,
          message: "Rate and amount are required for IBT",
        });
      }

      const stock = await StoreStock.findOne({
        store: fromStore,
        item: row.item,
      });

      if (!stock || stock.quantity < row.quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock for one or more items",
        });
      }
    }

    // 2. GENERATE TRANSFER NO
    const transferNo = await generateTransferNo();

    // 3. CREATE IBT DOCUMENT WITH RATE & AMOUNT
    const ibt = await InterBranchTransfer.create({
      transferNo,
      transferDate,
      fromStore,
      toStore,
      remarks,
      items: items.map((row) => ({
        item: row.item,
        itemcode: row.itemcode,
        quantity: row.quantity,
        rate: row.rate,
        amount: row.amount,
      })),
      createdBy: req.user?._id,
    });

    // 4. FIFO DEDUCTION + BATCH CREATION
    for (const row of items) {
      let remainingQty = Number(row.quantity);
      console.log(remainingQty)

      const batches = await BatchStock.find({
        item: row.item,
        store: fromStore,
        quantity: { $gt: 0 },
      }).sort({ receivedDate: 1 }); // FIFO

      for (const batch of batches) {
        if (remainingQty <= 0) break;

        const deductQty = Math.min(batch.quantity, remainingQty);

        batch.quantity -= deductQty;
        await batch.save();

        // Create batch in destination store with RATE
        await BatchStock.create({
          item: row.item,
          store: toStore,
          batchNo: `IBT-${transferNo}-${batch.batchNo}`,
          quantity: deductQty,
          rate: row.rate,
          receivedDate: transferDate,
        });

        remainingQty -= deductQty;
      }

      if (remainingQty > 0) {
        throw new Error("FIFO batch stock mismatch");
      }

      // 5. UPDATE STORE STOCK TOTALS
      await StoreStock.findOneAndUpdate(
        { store: fromStore, item: row.item },
        { $inc: { quantity: -row.quantity } }
      );

      await StoreStock.findOneAndUpdate(
        { store: toStore, item: row.item },
        { $inc: { quantity: row.quantity } },
        { upsert: true, new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: "Inter Branch Transfer completed with valuation",
      data: ibt,
    });
  } catch (error) {
    console.error("IBT Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};



export const getAllIBT = async (req, res) => {
  try {
    const data = await InterBranchTransfer.find()
      .populate("fromStore toStore")
      .populate("items.item")
      .sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getIBTById = async (req, res) => {
  try {
    const data = await InterBranchTransfer.findById(req.params.id)
      .populate("fromStore toStore")
      .populate("items.item");

    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
