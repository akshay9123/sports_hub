import ItemBrand from "../model/itemBrand.model.js";


// ================= CREATE =================
export const createItemBrand = async (req, res) => {
  try {
    const { name, salesman } = req.body;

    const newBrand = new ItemBrand({
      name,
      salesman,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const saved = await newBrand.save();
    return res
      .status(201)
      .json({ success: true, message: "Brand created", data: saved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ ALL =================
export const getAllItemBrands = async (req, res) => {
  try {
    const brands = await ItemBrand.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: brands });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ SINGLE (By ID) =================
export const getItemBrand = async (req, res) => {
  try {
    const brand = await ItemBrand.findById(req.params.id);

    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });

    return res.status(200).json({ success: true, data: brand });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= READ BY CODE =================
export const getItemBrandByCode = async (req, res) => {
  try {
    const brand = await ItemBrand.findOne({ code: req.params.code });

    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });

    return res.status(200).json({ success: true, data: brand });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE (Code cannot be updated) =================
export const updateItemBrand = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.salesman) updateData.salesman = req.body.salesman;

    // Code is intentionally protected (cannot be updated)
    // If new image comes
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updated = await ItemBrand.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });

    return res
      .status(200)
      .json({ success: true, message: "Brand updated", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE =================
export const deleteItemBrand = async (req, res) => {
  try {
    const deleted = await ItemBrand.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });

    return res
      .status(200)
      .json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

