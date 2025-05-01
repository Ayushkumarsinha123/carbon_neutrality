import CarbonSink from '../models/carbonSinkModel.js'

// Avg co2 absorption per tree per year in kg

const avgAbsorptionPerTree =  21;

// Add a new carbon sink entry 
export const addCarbonSink = async (req, res) => {
  try {
    const {sinkType, areaInHectares, numberOfTrees} = req.body;
    const mineId = req.userId;

    // calculate estimated co2 absorption
    let estimatedAbsorption = 0;
    if(numberOfTrees && numberOfTrees > 0) {
      estimatedAbsorption = numberOfTrees * avgAbsorptionPerTree; // per Kg/year
    }
    const newSink = new CarbonSink({
      mineId,
      sinkType,
      areaInHectares,
      numberOfTrees,
      estimatedAbsorption
    });
    await newSink.save();
    res.status(204).json({ message : 'carbon sink logged successfully.', sink: newSink});
  } catch(err) {
    console.error('Carbon Sink add Error:', err);
    res.status(500).json({message: 'failed to log carbon sink '});
  }
};

// Get all carbon sinks for the logged-in user

export const getCarbonSink = async (res, req) => {
  try {
    const mineId = req.userId;

    const sinks = await CarbonSink.find({mineId}).sort({date :-1});
    res.status(200).json(sinks);
  } catch(err) {
    console.error('get carbon sinks error',err);
    res.status(500).json({
      message : 'failed to retrieve carbon sink.'
    });
  }
};