import Customer from "../model/customer.model.js";
import fs from "fs";
import path from "path";


// ADD THE NEW CUSTOMER
export const addCustomer = async (req, res) => {
  try {
    const data = req.body;

    const profilePhoto = req.files?.profile_photo
      ? `/uploads/${req.files.profile_photo[0].filename}`
      : null;

    const attachmentFile = req.files?.attachment
      ? `/uploads/${req.files.attachment[0].filename}`
      : null;

    const newCustomer = new Customer({
      ...data,
      profile_photo: profilePhoto,
      attachment: attachmentFile,
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating customer",
      error: error.message,
    });
  }
};



// GET THE LIST OF THE ALL CUSTOMERS
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate({
        path: "under_ledger", // ChartsOfAccounts
        select: "code name type classification underGroup",
        populate: {
          path: "underGroup", // CoaGroups
          select: "name code nature inactive",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customers",
      error: error.message,
    });
  }
};





// GET THE CUSTOMER BY THE ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer fetched successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customer",
      error: error.message,
    });
  }
};





    // UPDATE THE CUSTOMER BY ID
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find existing customer
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    let updatedProfilePhoto = customer.profile_photo;

    // If new file uploaded
    if (req.file) {
      updatedProfilePhoto = `/uploads/${req.file.filename}`;

      // Delete old file if exists
      if (customer.profile_photo) {
        const oldImagePath = path.join(process.cwd(), customer.profile_photo);

        // Check file exists → then delete
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        ...data,
        profile_photo: updatedProfilePhoto,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating customer",
      error: error.message,
    });
  }
};



// DELETE THE EXISTING CUSTOMER BY ID
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // Find customer first
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Delete profile photo if exists
    if (customer.profile_photo) {
      const filePath = path.join(process.cwd(), customer.profile_photo);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete image
      }
    }

    // Delete customer from DB
    await Customer.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting customer",
      error: error.message,
    });
  }
};
