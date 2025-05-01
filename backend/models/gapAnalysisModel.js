import mongoose from "mongoose";
const gapAnalysisSchema = new mongoose.Schema({
  mineId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  },
  totalEmission : Number,
  totalCarbonSink : Number,
  gap : Number,
  recommendations : [String],
  createdAt : {
    type: Date,
    default : Date.now,
  }
});

const GapAnalysis = mongoose.model('GapAnalysis', gapAnalysisSchema);
export default GapAnalysis;