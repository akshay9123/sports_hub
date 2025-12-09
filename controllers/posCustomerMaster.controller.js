import PosCustomerMaster from "../model/posCustomerMaster.model.js";

// 🟢 Create Customer (code auto-generate hoga)
export const createCustomer = async (req, res) => {
  try {
    // Ensure user cannot send code from frontend
    if (req.body.code) {
      delete req.body.code;
    }

    const newCustomer = new PosCustomerMaster(req.body);
    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

// 🟢 Get All Customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await PosCustomerMaster.find();

    res.status(200).json({
      success: true,
      total: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get Customer by Code
export const getCustomerByCode = async (req, res) => {
  try {
    const customer = await PosCustomerMaster.findOne({ code: req.params.code });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟡 Update Customer (code update allowed nahi)
// 🟡 Update Customer by _id (code update allowed nahi)
export const updateCustomer = async (req, res) => {
  try {
    // frontend se agar code bheja bhi jaaye, update nahi hoga
    if (req.body.code) {
      delete req.body.code;
    }

    const updatedCustomer = await PosCustomerMaster.findByIdAndUpdate(
      req.params.id, // 👈 now update by id
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔴 Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await PosCustomerMaster.findOneAndDelete({
      code: req.params.code,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔵 Get Customer by MongoDB _id
export const getCustomerById = async (req, res) => {
  try {
    const customer = await PosCustomerMaster.findById(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
