import Emission from "../models/emissionModel.js";

// add new emission entry 
export const addEmission = async (req, res) => {
  try{
    const {activityType, emissionValue} = req.body;
    const mineId = req.user.userId; // comes from authmiddleware

    const newEmission = new Emission({
      mineId,
      activityType,
      emissionValue
    });

    await newEmission.save();
    res.status(201).json({
      message : 'emission data added', emission: newEmission
    });
  } catch(err) {
    console.error('Add Emission Error:',err);
    res.status(500).json({
      message : 'Failed to add emission data'
    });
  }
};

// get all emissions for logged-in mine/user
export const getMineEmissions = async (req, res) => {
  try {
    const mineId = req.user.userId;

    const emission = await Emission.find({ mineId }).sort({date:-1});
    res.status(200).json(emission);
  } catch(err) {
    console.error('get emission error:', err)
    res.status(500).json({message : 'failed to fetch emission data'});
  }
};