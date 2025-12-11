import PosOrder from "../model/posOrder.model.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    // Code will be auto-generated in pre("save") middleware
    const order = new PosOrder(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await PosOrder.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// GET ORDER BY CODE
export const getOrderByCode = async (req, res) => {
  try {
    const order = await PosOrder.findOne({ code: req.params.code });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// UPDATE ORDER BY ID
export const updateOrderById = async (req, res) => {
  try {
    // Block code update FROM FRONTEND
    if (req.body.code) {
      delete req.body.code;
    }

    const updated = await PosOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};



// DELETE ORDER BY ID
export const deleteOrderById = async (req, res) => {
  try {
    const deleted = await PosOrder.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
