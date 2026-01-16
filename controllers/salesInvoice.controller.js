// import SalesInvoice from "../model/salesInvoice.model.js";

// // --------------------------------------------
// // CREATE INVOICE
// // --------------------------------------------
// export const createSalesInvoice = async (req, res) => {
//   try {
//     const invoiceData = req.body;

//     // At least 1 item check
//     if (!invoiceData.items || invoiceData.items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "At least one item is required",
//       });
//     }

//     const invoice = await SalesInvoice.create(invoiceData);

//     res.status(201).json({
//       success: true,
//       message: "Invoice created successfully",
//       data: invoice,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error creating invoice",
//       error: error.message,
//     });
//   }
// };

// // --------------------------------------------
// // GET ALL INVOICES
// // --------------------------------------------
// export const getAllSalesInvoices = async (req, res) => {
//   try {
//     const invoices = await SalesInvoice.find()
//       .populate("store")
//       .populate("customer")
//       .populate("price_category");

//     res.status(200).json({
//       success: true,
//       data: invoices,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching invoices",
//       error: error.message,
//     });
//   }
// };

// // --------------------------------------------
// // GET SINGLE INVOICE BY ID
// // --------------------------------------------
// export const getSalesInvoiceById = async (req, res) => {
//   try {
//     const invoice = await SalesInvoice.findById(req.params.id)
//       .populate("store")
//       .populate("customer")
//       .populate("price_category");

//     if (!invoice) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: invoice,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching invoice",
//       error: error.message,
//     });
//   }
// };

// // --------------------------------------------
// // UPDATE INVOICE BY ID
// // --------------------------------------------
// export const updateSalesInvoice = async (req, res) => {
//   try {
//     const updatedInvoice = await SalesInvoice.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedInvoice) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Invoice updated successfully",
//       data: updatedInvoice,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error updating invoice",
//       error: error.message,
//     });
//   }
// };

// // --------------------------------------------
// // DELETE INVOICE BY ID
// // --------------------------------------------
// export const deleteSalesInvoice = async (req, res) => {
//   try {
//     const deletedInvoice = await SalesInvoice.findByIdAndDelete(req.params.id);

//     if (!deletedInvoice) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Invoice deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error deleting invoice",
//       error: error.message,
//     });
//   }
// };





import SalesInvoice from "../model/salesInvoice.model.js";
import StoreStock from "../model/StoreStock.model.js";
import BatchStock from "../model/batchStock.model.js";
import ItemMaster from "../model/itemMaster.model.js";

// Invoice No Generator
const generateInvoiceNo = async () => {
  const last = await SalesInvoice.findOne().sort({ createdAt: -1 });
  if (!last) return "SI0001";

  const num = parseInt(last.invoiceNo.replace("SI", "")) + 1;
  return "SI" + num.toString().padStart(4, "0");
};

export const createSalesInvoice = async (req, res) => {
  try {
    const {
      store,
      customer,
      date,
      items,
      remarks,
      gstType,
      cashCredit,
      receivedAmount,
      cashBankLedger,
    } = req.body;

    if (!store || !customer || !date || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const invoiceNo = await generateInvoiceNo();

    let itemTotal = 0;

    // PROCESS EACH ITEM
    for (const row of items) {
      const { itemCode, quantity, rate } = row;

      if (!itemCode || !quantity || !rate) {
        return res.status(400).json({
          success: false,
          message: "Invalid item data",
        });
      }

      const item = await ItemMaster.findOne({ code: itemCode });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `Item not found: ${itemCode}`,
        });
      }

      // CHECK STORE STOCK
      const storeStock = await StoreStock.findOne({
        item: item._id,
        store,
      });

      if (!storeStock || storeStock.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.name}`,
        });
      }

      // FIFO DEDUCTION
      let remainingQty = Number(quantity);

      const batches = await BatchStock.find({
        item: item._id,
        store,
        quantity: { $gt: 0 },
      }).sort({ receivedDate: 1 });

      for (const batch of batches) {
        if (remainingQty <= 0) break;

        const deduct = Math.min(batch.quantity, remainingQty);
        batch.quantity -= deduct;
        remainingQty -= deduct;

        await batch.save();
      }

      // UPDATE STORE STOCK
      storeStock.quantity -= Number(quantity);
      await storeStock.save();

      // CALCULATIONS
      row.item = item._id;
      row.description = item.name;
      row.amount = Number(rate) * Number(quantity);
      row.itemBalance = storeStock.quantity;

      itemTotal += row.amount;
    }

    // FINAL DOCUMENT AMOUNT
    const docAmount = itemTotal; // Tax/discount layer can be added later

    const invoice = await SalesInvoice.create({
      ...req.body,
      invoiceNo,
      remarks,
      receivedAmount,
      cashBankLedger,
      docAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Sales Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Sales Invoice Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
export const getAllSalesInvoices = async (req, res) => {
  try {
    const data = await SalesInvoice.find()
      .populate("store", "name code")
      .populate("customer", "name code")
      .populate("items.item", "name code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSalesInvoiceById = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findById(req.params.id)
      .populate("store", "name code")
      .populate("customer", "name code gstNo address")
      .populate("items.item", "name code unit");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSalesInvoice = async (req, res) => {
  try {
    const updates = req.body;

    delete updates.items; // prevent stock tampering
    delete updates.store;
    delete updates.customer;

    const updated = await SalesInvoice.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const cancelSalesInvoice = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // RESTORE STOCK
    for (const row of invoice.items) {
      await StoreStock.findOneAndUpdate(
        { item: row.item, store: invoice.store },
        { $inc: { quantity: row.quantity } }
      );

      // Re-add to BatchStock as new batch
      await BatchStock.create({
        item: row.item,
        store: invoice.store,
        batchNo: `CANCEL-${invoice.invoiceNo}`,
        quantity: row.quantity,
        rate: row.rate,
        receivedDate: new Date(),
      });
    }

    await invoice.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Invoice cancelled & stock restored",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



