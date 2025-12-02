import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema({
  gst_type: {
    type: String,
  },
  cash_credit: {
    type: String,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  email: {
    type: String,
  },
  price_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PriceCategory",
  },
  date: {
    type: Date,
    required: true,
  },
  invoice_no: {
    type: String,
  },
  ref_no: {
    type: String,
  },
  ref_date: {
    type: Date,
  },
  salesman: {
    type: String,
  },
  tax: {
    type: String,
  },

  //   BILL TO
  address: {
    type: String,
  },

  gst_no: {
    type: String,
  },
  contact_person: {
    type: String,
  },
  place_of_supply: {
    type: String,
  },
  rcm_applicable: {
    type: Boolean,
  },
  e_comm_invoice_no: {
    type: String,
  },

  //   SHIP TO
  payment_terms: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  payment_link: {
    type: String,
  },

  //   MULTIPLE ITEMS
  items: [
    {
      selected_item: {
        type: String,
        required: true,
      },
      item_desc: {
        type: String,
      },
      pack_unit: {
        type: String,
      },
      pack_quant: {
        type: String,
      },
      unit: {
        type: String,
      },
      quant: {
        type: String,
      },
      free_quant: {
        type: String,
      },
      rate_per: {
        type: String,
      },
      rate: {
        type: String,
      },
      amount: {
        type: String,
      },
      min_rate: {
        type: String,
      },
      discount: {
        type: String,
      },
      discount_percent: {
        type: String,
      },
      tax_code: {
        type: String,
      },
      tax_rate: {
        type: String,
      },
      taxable: {
        type: String,
      },
      tax_amount: {
        type: String,
      },
      mrp: {
        type: String,
      },
      net_rate: {
        type: String,
      },
      print_desc: {
        type: String,
      },
      service_date: {
        type: Date,
      },
      service_location: {
        type: String,
      },
      item_barcode: {
        type: String,
      },
      posting_gl: {
        type: String,
      },
      promo_quant: {
        type: String,
      },
      promotion: {
        type: String,
      },
      barcode_disc: {
        type: String,
      },
      coupan: {
        type: String,
      },
      so_vno: {
        type: String,
      },
      so_ref_no: {
        type: String,
      },
      so_ref_date: {
        type: String,
      },
      so_vdate: {
        type: String,
      },
      gp_vno: {
        type: String,
      },
      gp_ref_no: {
        type: String,
      },
      gp_ref_date: {
        type: String,
      },
      gp_vdate: {
        type: String,
      },
      bd_batch_no: {
        type: String,
      },
      bd_mfg_date: {
        type: String,
      },
      bd_exp_date: {
        type: String,
      },
      bd_sale_rate: {
        type: String,
      },
      item_balance: {
        type: String,
      },
      barcode: {
        type: String,
      },
      line_level_barcode: {
        type: String,
      },
      igst: {
        type: String,
      },
      cgst: {
        type: String,
      },
      sgst: {
        type: String,
      },
      hsn_code: {
        type: String,
      },
      brand: {
        type: String,
      },
    },
  ],

  remarks: {
    type: String,
  },
  recieved_amount: {
    type: String,
  },
  cash_bank_ledger: {
    type: String,
  },
  attachment: {
    type: String, // URL or local path
    default: null,
  },

  //   LEDGER ATTRIBUTES
  employee: {
    type: String,
  },
  group: {
    type: String,
  },
});


const SalesInvoice = mongoose.model("SalesInvoice", salesInvoiceSchema);
export default SalesInvoice