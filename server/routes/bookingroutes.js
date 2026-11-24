const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Retrieve user bookings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.userId
    }).sort({ bookedAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load bookings."
    });
  }
});

// Create booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, details } = req.body || {};

    if (
      !["Trip", "Flight", "Hotel", "Cab"].includes(type) ||
      !details ||
      typeof details.title !== "string" ||
      !details.title.trim() ||
      !Number.isFinite(details.total) ||
      details.total < 0
    ) {
      return res.status(400).json({
        message: "Invalid booking details."
      });
    }

    const booking = await Booking.create({
      userId: req.userId,
      type,
      details,
      status: "Confirmed"
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking."
    });
  }
});

module.exports = router;