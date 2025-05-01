import GapAnalysis from '../models/gapAnalysisModel.js';
import Emission from '../models/emissionModel.js';
import CarbonSink from '../models/carbonSinkModel.js';

export const performGapAnalysis = async (req, res) => {
  try {
    const mineId = req.userId;
    
    const emissions = await Emission.find({mineId});
    const sinks = await CarbonSink.find({mineId});


    const totalEmission = emissions.reduce((sum, e)=> sum + (e.emissionAmount || 0),0);
    const totalCarbonSink = sinks.reduce((sum, s) => sum + (s.estimatedAbsorption || 0), 0);
    const gap = totalEmissions - totalCarbonSink;

    const recommendations = [];

    if (gap > 0) {
      recommendations.push(`Plant more trees or expand sinks to absorb ~${gap} kg CO₂.`);
      recommendations.push("Adopt cleaner technologies or optimize mining operations.");
      recommendations.push("Consider carbon credit options for offsetting.");
    } else {
      recommendations.push("You're carbon neutral or better! Maintain and monitor.");
    }
    const newAnalysis = await GapAnalysis.create({ mineId, totalEmissions, totalCarbonSink, gap, recommendations });

    res.status(200).json({
      totalEmissions,
      totalCarbonSink,
      gap,
      recommendations
    });
  } catch(err) {
    console.error('gap analysis Error:',err);
    res.status(500).json({ message : "failed to perform gap analysis"})
  }

};