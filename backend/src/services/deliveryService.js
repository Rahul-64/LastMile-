const db = require("../db/db");


exports.placeOrder = async (customer_name) => {
  try {
    // 1. Generate random shipment_id
    const shipment_id = "SHIP" + Math.floor(Math.random() * 100000);
    
    // 2. Generate random 6-digit OTP
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 3. Insert into database
    await db.query(
      `INSERT INTO shipments (shipment_id, customer_name, otp_code, status)
       VALUES (?, ?, ?, 'Pending')`,
      [shipment_id, customer_name, otp_code]
    );
    
    // 4. Return shipment details
    return {
      shipment_id,
      otp_code,
    };
  } catch (error) {
    console.error("Service Layer Error:", error);
    throw error;
  }
};



// 🔹 CONFIRM DELIVERY
exports.confirmDelivery = async (shipment_id, otp, delivered_by) => {

  //finding row of shipment_id
  const [rows] = await db.query(
    "SELECT * FROM shipments WHERE shipment_id = ?",
    [shipment_id]
  );

  // if nothing is found return invalid shipment
  if (rows.length === 0) {
    const error = new Error("Invalid shipment");
    error.statusCode = 404;
    throw error;
  }

  const shipment = rows[0];

  // already delivered section
  if (shipment.status === "Delivered") {
    return {
      status: "already_delivered",
      shipment_id: shipment.shipment_id,
      delivered_by: shipment.delivered_by,
      delivered_at: shipment.delivered_at,
    };
  }

  // wrong otp section 
  if (shipment.otp_code !== otp) {
    return {
      status: "invalid_otp",
    };
  }

  // success delivery section 
  const deliveredAt = new Date();

  //update in DB
  await db.query(
    `UPDATE shipments 
     SET status = 'Delivered',
         delivered_by = ?,
         delivered_at = ?
     WHERE shipment_id = ?`,
    [delivered_by, deliveredAt, shipment_id]
  );

  return {
    status: "delivered",
    shipment_id: shipment.shipment_id,
    customer_name: shipment.customer_name,
    delivered_by,
    delivered_at: deliveredAt,
  };
};

