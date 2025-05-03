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
  quantity: {
    type: Number,
    required: true,
  },
  date : {
    type : Date,
    default: Date.now
  },
  emissionValue : {
    type : Number,
    required : true
  }
});
const Emission  = mongoose.model('Emission', emissionSchema);
export default Emission;