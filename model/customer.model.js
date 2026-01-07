import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  gst_no: {
    type: String,
  },
  cust_name: {
    type: String,
    required: true,
  },
  print_name: {
    type: String,
    required: true,
  },
  identification: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  under_ledger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChartsOfAccounts",
    required: true,
  },
  cust_comman: {
    type: Boolean,
  },
  is_sub_customer: {
    type: Boolean,
  },
  under_customer: {
    type: Boolean,
  },
  profile_photo: {
    type: String, // URL or local path
    default: null,
  },

  // statuory
  gst: {
    type: String,
  },
  registration_date: {
    type: String,
  },
  cin: {
    type: String,
  },
  pan: {
    type: String,
  },
  goods_service: {
    type: String,
  },
  gst_category: {
    type: String,
  },
  gst_suspend: {
    type: Boolean,
  },
  distance: {
    type: Number,
  },
  tds_on_gst_applicable: {
    type: Boolean,
  },

  // Communication
  // Billing Info

  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pin_code: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  route_map: {
    type: String,
  },

  // Shipping Info
  address_ship: {
    type: String,
  },
  country_ship: {
    type: String,
  },
  state_ship: {
    type: String,
    required: true,
  },
  city_ship: {
    type: String,
    required: true,
  },
  pin_code_ship: {
    type: String,
  },
  phone_ship: {
    type: String,
  },
  email_ship: {
    type: String,
  },
  longitude_ship: {
    type: String,
  },
  latitude_ship: {
    type: String,
  },
  route_map_ship: {
    type: String,
  },

  // Social Profile
  website: {
    type: String,
  },
  facebook: {
    type: String,
  },
  skype: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },

  // DEFAULTS
  payment_term: {
    type: String,
  },
  price_category: {
    type: String,
  },
  batch_rate_category: {
    type: String,
  },
  sales_executive: {
    type: String,
  },
  transporter: {
    type: String,
  },
  credit_limit: {
    type: String,
  },
  max_credit_days: {
    type: String,
  },
  interest_rate_yearly: {
    type: String,
  },
  customer_on_watch: {
    type: String,
  },
  firm_status: {
    type: String,
  },
  territory: {
    type: String,
  },
  customer_category: {
    type: String,
  },

  contact_person: {
    type: String,
  },

  // Bank Details
  ifsc_code: {
    type: String,
  },
  account_number: {
    type: String,
  },
  bank_name: {
    type: String,
  },
  branch: {
    type: String,
  },

  // contact person
  contact: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      designation: {
        type: String,
      },
    },
  ],
  
  attachment: {
    type: String, // URL or local path
    default: null,
  },
});


// Auto-generate code ALWAYS
CustomerSchema.pre("save", async function (next) {
  // ALWAYS auto-generate -- user can never give code
  const lastDoc = await this.constructor.findOne().sort({ code: -1 });

  let nextCode = "0001";

  if (lastDoc && lastDoc.code) {
    const lastNum = parseInt(lastDoc.code);
    nextCode = String(lastNum + 1).padStart(4, "0");
  }

  this.code = nextCode;

  next();
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
