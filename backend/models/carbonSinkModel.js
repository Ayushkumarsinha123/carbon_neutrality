import mongoose from 'mongoose';

const carbonSinkSchema = new mongoose.Schema({
  mineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true
  },
  sinkType: {
    type : String,
    enum : ['tree plantation', 'wetland', 'Soil Carbon', 'Agroforestry'],
    required:true
  },
  areaInHectares : {
    type:Number,
    required: true 
  },
  numberOfTrees : {
    type: Number,
    default : 0
  },
  estimatedAbsorption: {
    type: Number,
    required: true
  },
  data : {
    type : Date,
    default: Date.now
  }
});

const CarbonSink = mongoose.model('CarbonSink', carbonSinkSchema);
export default CarbonSink;