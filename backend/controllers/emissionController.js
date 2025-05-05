import Emission from "../models/emissionModel.js";
import emissionFactors from "../utils/emissionFactors.js";
import { calculateEmissions } from "../utils/carbonCreditCalculator.js";

// Add new emission entry with auto calculation
export const addEmission = async (req, res) => {
  try {
    console.log("Received emission request:", req.body);
    console.log("Authenticated user:", req.user);

    const { activityType, quantity } = req.body;
    const mineId = req.userId;

    if (!activityType || !quantity) {
      return res.status(400).json({ message: "Activity type and quantity are required." });
    }

    const factor = emissionFactors[activityType];
    if (!factor) {
      return res.status(400).json({ message: "Invalid activity type." });
    }

    const emissionValue = calculateEmissions({ [activityType]: quantity }, emissionFactors);

    const newEmission = new Emission({
      mineId,
      activityType,
      emissionValue,
      quantity
    });

    await newEmission.save();
    res.status(201).json({
      message: "Emission data added.",
      emission: newEmission
    });
  } catch (err) {
    console.error("🔥 Add Emission Error:", err);
    res.status(500).json({ message: "Failed to add emission data." });
  }
};

// Get all emissions for logged-in user
export const getMineEmissions = async (req, res) => {
  try {
    const mineId = req.userId;
    const emission = await Emission.find({ mineId }).sort({ date: -1 });
    res.status(200).json(emission);
  } catch (err) {
    console.error("Get emission error:", err);
    res.status(500).json({ message: "Failed to fetch emission data." });
  }
};
