import Transporter from "../model/transporter.model.js";

// Create Transporter
export const createTransporter = async (req, res) => {
  try {
    const { code, name, gstNo, websiteUrl } = req.body;

    if (!name || !gstNo || !code) {
      return res.status(400).json({
        success: false,
        message: "Code, Name & GST No are required",
      });
    }

    // Check duplicate code
    const exist = await Transporter.findOne({ code });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Code already exists",
      });
    }

    const transporter = await Transporter.create({
      code,
      name,
      gstNo,
      websiteUrl,
    });

    res.status(201).json({
      success: true,
      message: "Transporter created successfully",
      data: transporter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Transporters
export const getTransporters = async (req, res) => {
  try {
    const transporters = await Transporter.find();
    res.status(200).json({
      success: true,
      data: transporters,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Transporter by ID
export const getTransporter = async (req, res) => {
  try {
    const transporter = await Transporter.findById(req.params.id);

    if (!transporter)
      return res
        .status(404)
        .json({ success: false, message: "Transporter not found" });

    res.status(200).json({ success: true, data: transporter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Transporter
export const updateTransporter = async (req, res) => {
  try {
    const { code } = req.body;

    // if user updates code then check duplicate
    if (code) {
      const exist = await Transporter.findOne({
        code,
        _id: { $ne: req.params.id },
      });
      if (exist)
        return res
          .status(400)
          .json({ success: false, message: "Code already exists" });
    }

    const transporter = await Transporter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!transporter)
      return res
        .status(404)
        .json({ success: false, message: "Transporter not found" });

    res.status(200).json({
      success: true,
      message: "Transporter updated successfully",
      data: transporter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Transporter
export const deleteTransporter = async (req, res) => {
  try {
    const transporter = await Transporter.findByIdAndDelete(req.params.id);

    if (!transporter)
      return res
        .status(404)
        .json({ success: false, message: "Transporter not found" });

    res
      .status(200)
      .json({ success: true, message: "Transporter deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Transporter by Code
export const getTransporterByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const transporter = await Transporter.findOne({ code });

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: "Transporter not found with this code"
      });
    }

    res.status(200).json({
      success: true,
      data: transporter
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
