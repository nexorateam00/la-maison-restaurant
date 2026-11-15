
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
    }

    const reservation = await Reservation.create(req.body);

    return res.status(201).json({
      message: "Reservation saved successfully",
      reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
