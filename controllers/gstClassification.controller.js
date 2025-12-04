import GstClassification from "../model/gstClassification.model.js";



// ========== CREATE (Code auto-generate Hoga) ==========
export const createGstClassification = async (req, res) => {
  try {
    // User code provide kare toh ignore karo
    const { type, hsn_sac_code, hsn_description } = req.body;

    const newGst = new GstClassification({
      type,
      hsn_sac_code,
      hsn_description,
    });

    await newGst.save();

    return res.status(201).json({
      success: true,
      message: "GST Classification created successfully",
      data: newGst,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ========== GET ALL ==========
export const getAllGstClassification = async (req, res) => {
  try {
    const data = await GstClassification.find().sort({ code: 1 });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ========== GET SINGLE ==========
export const getSingleGstClassification = async (req, res) => {
  try {
    const data = await GstClassification.findById(req.params.id);

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ========== UPDATE (CODE CANNOT CHANGE) ==========
export const updateGstClassification = async (req, res) => {
  try {
    const { type, hsn_sac_code, hsn_description } = req.body;

    // code remove/ignore so user can't update it
    const updatedData = {
      type,
      hsn_sac_code,
      hsn_description,
    };

    const data = await GstClassification.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({
      success: true,
      message: "GST Classification updated",
      data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ========== DELETE ==========
export const deleteGstClassification = async (req, res) => {
  try {
    const data = await GstClassification.findByIdAndDelete(req.params.id);

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({
      success: true,
      message: "GST Classification deleted",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// ========== SEARCH BY CODE ==========
export const getGstClassificationByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const data = await GstClassification.findOne({ code });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No record found with this code",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
