import SalesPriceList from "../model/salesPriceList.model.js";

// CREATE
export const createSalesPriceList = async (req, res) => {
  try {
    const { description, price_category, store, brand, effective_from } =
      req.body;

    if (!description || !price_category || !effective_from) {
      return res
        .status(400)
        .json({
          message: "description, price_category, effective_from required",
        });
    }

    const newPriceList = await SalesPriceList.create({
      description,
      price_category,
      store,
      brand,
      effective_from,
    });

    return res.status(201).json({
      message: "Sales price list created successfully",
      data: newPriceList,
    });
  } catch (error) {
    console.error("Error creating sales price list:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// GET ALL
export const getAllSalesPriceList = async (req, res) => {
  try {
    const data = await SalesPriceList.find().sort({ effective_from: -1 });

    return res.status(200).json({
      message: "Sales price list fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// GET SINGLE
export const getSingleSalesPriceList = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await SalesPriceList.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ data: record });
  } catch (error) {
    console.error("Error fetching single:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// UPDATE
export const updateSalesPriceList = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await SalesPriceList.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({
      message: "Sales price list updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE
export const deleteSalesPriceList = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SalesPriceList.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
