import Counter from "../model/counter.model.js";


// CREATE
export const createCounter = async (req, res) => {
  try {
    // Do NOT accept `code` from frontend
    if (req.body.code) delete req.body.code;

    const counter = new Counter(req.body);
    const saved = await counter.save();

    return res.status(201).json({
      success: true,
      message: "Counter created successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllCounters = async (req, res) => {
  try {
    const data = await Counter.find().sort({ code: 1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getCounterById = async (req, res) => {
  try {
    const data = await Counter.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY CODE
export const getCounterByCode = async (req, res) => {
  try {
    const data = await Counter.findOne({ code: req.params.code });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BY ID
export const updateCounterById = async (req, res) => {
  try {
    // Block code from update
    if (req.body.code) delete req.body.code;

    const updated = await Counter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Counter updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BY ID
export const deleteCounterById = async (req, res) => {
  try {
    const deleted = await Counter.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Counter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Counter deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
