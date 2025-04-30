import mongoose from 'mongoose';

const emissionSchema = new mongoose.Schema({
  mineId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true
  },
  activityType :{
    type : String ,
    enum : ['Excavation','Transportation','Drilling','Machinery','Electricity'],
    required : true
  },
  data : {
    type : Date,
    default: Date.now
  }
});
const Emission  = mongoose.model('Emission', emissionSchema);
export default Emission;