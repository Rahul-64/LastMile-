const deliveryService = require("../services/deliveryService");

exports.placeOrder = async (req, res) => {
  const { customer_name } = req.body;
  
  // Validation
  if (!customer_name) {
    return res.status(400).json({
      message: "Customer name is required",
    });
  }
  
  try {
    // Call service layer
    const result = await deliveryService.placeOrder(customer_name);
    
    // Return success response
    return res.status(200).json({
      shipment_id: result.shipment_id,
      otp_code: result.otp_code,
    });
  } catch (error) {

    //if error found
    console.error("PLACE ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};



exports.confirmDelivery = async (req, res) => {
  const { shipment_id, otp, delivered_by } = req.body;

  // check OTP missing
  if (!otp) {
    return res.status(200).json({
      status: "otp_missing",
    });
  }

  try {
    //1. getting confiremDelhivery from service
    const result = await deliveryService.confirmDelivery(
      shipment_id,
      otp,
      delivered_by
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "server_error",
      message: error.message || "Internal Server Error",
    });
  }
};


