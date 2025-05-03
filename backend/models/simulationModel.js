import mongoose from 'mongoose';


const simulationSchema = new mongoose.Schema({
  mineId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  simulationName: {
    type : String,
    required : true
  },
  parameters : {
    emission : {type: Number, required : true},
    annualReduction : {type : Number, required : true},
    annualOffset : {type: Number, required: true}
  },
  result :{
    type : Object,  // store calculated data like estimated time to neutrality
    default:{}
  },
  createdAt : {
    type: Date,
    default : Date.now
  }
});

const Simulation = mongoose.model('Simulation',simulationSchema);
export default Simulation;
