const express = require("express");
const router = express.Router();

const deliveryController = require("../controllers/deliveryController");

// Place order 
// adding entry into DB 
// and check validity
router.post("/place-order", deliveryController.placeOrder);

// Confirm delivery
// check delivery already exist or not
router.post("/confirm-delivery", deliveryController.confirmDelivery);

module.exports = router;