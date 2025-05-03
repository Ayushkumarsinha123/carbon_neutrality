import Simulation from '../models/simulationModel.js';

// Utility function to simulate over time
const simulateNeutralityTimeline = (emission, annualReduction, annualOffset) => {
  let remainingEmission = emission;
  let year = new Date().getFullYear();
  const timeline = [];

  while (remainingEmission > 0 && timeline.length < 100) {
    const totalReduction = annualReduction + annualOffset;
    remainingEmission -= totalReduction;

    timeline.push({
      year,
      remainingEmission: remainingEmission > 0 ? Math.round(remainingEmission) : 0
    });

    year++;
  }

  return {
    timeline,
    yearsToNeutrality: timeline.length,
    achieved: remainingEmission <= 0
  };
};

// POST - Create a simulation
export const createSimulation = async (req, res) => {
  try {
    const mineId = req.user.userId;
    const {
      simulationName,
      parameters: { emission, annualReduction, annualOffset }
    } = req.body;

    if (!emission || !annualReduction || !annualOffset) {
      return res.status(400).json({ message: "Missing required simulation parameters." });
    }

    const result = simulateNeutralityTimeline(emission, annualReduction, annualOffset);

    const newSim = await Simulation.create({
      mineId,
      simulationName,
      parameters: { emission, annualReduction, annualOffset },
      result
    });

    res.status(201).json({
      message: "Simulation created successfully",
      simulation: newSim
    });
  } catch (error) {
    console.error("Simulation Creation Error:", error);
    res.status(500).json({ message: "Failed to create simulation." });
  }
};

// GET - All simulations by logged-in user
export const getSimulations = async (req, res) => {
  try {
    const mineId = req.user.userId;
    const sims = await Simulation.find({ mineId }).sort({ createdAt: -1 });
    res.status(200).json(sims);
  } catch (error) {
    console.error("Simulation Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch simulations." });
  }
};
