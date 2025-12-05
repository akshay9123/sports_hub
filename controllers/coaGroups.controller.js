import CoaGroups from "../model/coaGroups.model";

// ================================
// CREATE GROUP
// ================================
export const createCoaGroup = async (req, res) => {
  try {
    const { name, inactive, nature } = req.body;

    const exists = await CoaGroups.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Group already exists" });
    }

    const newGroup = new CoaGroups({ name, inactive, nature });
    const saved = await newGroup.save();

    return res.status(201).json({
      success: true,
      message: "CoA Group created successfully",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// GET ALL GROUPS
// ================================
export const getAllCoaGroups = async (req, res) => {
  try {
    const groups = await CoaGroups.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: groups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// GET SINGLE GROUP BY ID
// ================================
export const getCoaGroupById = async (req, res) => {
  try {
    const group = await CoaGroups.findById(req.params.id);

    if (!group)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });

    res.status(200).json({ success: true, data: group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// UPDATE GROUP
// ================================
export const updateCoaGroup = async (req, res) => {
  try {
    const updated = await CoaGroups.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });

    res
      .status(200)
      .json({ success: true, message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// DELETE GROUP
// ================================
export const deleteCoaGroup = async (req, res) => {
  try {
    const deleted = await CoaGroups.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get by code
export const getCoaGroupByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const group = await CoaGroups.findOne({ code });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found with this code",
      });
    }

    return res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
