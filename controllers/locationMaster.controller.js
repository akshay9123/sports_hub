import LocationMaster from "../model/locationMaster.model.js";



// ===================================================
// CREATE Location  (Code auto-generate Hoga pre-save se)
// ===================================================
export const createLocation = async (req, res) => {
  try {
    const data = req.body;

    // user se code kabhi mat lo, pre-save hook generate karega
    if (data.code) delete data.code;

    const newLocation = new LocationMaster(data);
    const saved = await newLocation.save();

    return res.status(201).json({
      success: true,
      message: "Location created successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating location",
      error: error.message,
    });
  }
};

// ===================================================
// GET ALL Locations
// ===================================================
export const getAllLocations = async (req, res) => {
  try {
    const locations = await LocationMaster.find().sort({ code: 1 });
    return res.status(200).json({ success: true, data: locations });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching locations",
        error: error.message,
      });
  }
};

// ===================================================
// GET Single Location by ID
// ===================================================
export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await LocationMaster.findById(id);

    if (!location)
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });

    return res.status(200).json({ success: true, data: location });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching location",
        error: error.message,
      });
  }
};

// ===================================================
// GET Location by Code  🔥 (NEW)
// ===================================================
export const getLocationByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const location = await LocationMaster.findOne({ code });

    if (!location)
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });

    return res.status(200).json({ success: true, data: location });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching location",
        error: error.message,
      });
  }
};

// ===================================================
// UPDATE Location (code update ❌ not allowed)
// ===================================================
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;

    // code update block karega
    if (req.body.code) delete req.body.code;

    const updated = await LocationMaster.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });

    return res
      .status(200)
      .json({
        success: true,
        message: "Location updated successfully",
        data: updated,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error updating location",
        error: error.message,
      });
  }
};

// ===================================================
// DELETE Location
// ===================================================
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await LocationMaster.findByIdAndDelete(id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });

    return res
      .status(200)
      .json({ success: true, message: "Location deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting location",
      error: error.message,
    });
  }
};
