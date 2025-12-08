import DocumentCategoryInventory from "../model/documentCategoryInventory.model.js";


// CREATE
export const createDocumentCategory = async (req, res) => {
  try {
    const data = req.body;

    const newDoc = new DocumentCategoryInventory(data);
    const saved = await newDoc.save();

    return res.status(201).json({
      success: true,
      message: "Document Category Created Successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// READ All
export const getAllDocumentCategories = async (req, res) => {
  try {
    const list = await DocumentCategoryInventory.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// READ Single
export const getDocumentCategoryById = async (req, res) => {
  try {
    const item = await DocumentCategoryInventory.findById(req.params.id);

    if (!item)
      return res.status(404).json({ success: false, message: "Not Found" });

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateDocumentCategory = async (req, res) => {
  try {
    const updated = await DocumentCategoryInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Not Found" });

    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteDocumentCategory = async (req, res) => {
  try {
    const deleted = await DocumentCategoryInventory.findByIdAndDelete(
      req.params.id
    );

    if (!deleted)
      return res.status(404).json({ success: false, message: "Not Found" });

    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
