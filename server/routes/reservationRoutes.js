
const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const { name, phone, guests, date, time, message } = req.body;

    if (!name || !phone || !guests || !date || !time) {
      return res.status(400).json({
        message: "Please fill in all required fields"
      });
    }

    const reservation = new Reservation({
      name,
      phone,
      guests,
      date,
      time,
      message
    });

    await reservation.save();

    res.status(201).json({
      message: "Reservation created successfully!",
      reservation
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;
