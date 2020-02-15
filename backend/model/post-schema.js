const mongoose = require('mongoose');

const timestamp = require('../middlewares/timestamp');

postSchema = new mongoose.Schema({
  title: {
    type: String, required: true
  },
  description: {
    type: String
  },
  imagePath: {
    type: String
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USERTWO',
    required: true
  },
  creatorName: {
    type: mongoose.Schema.Types.String,
    ref: 'USERTWO',
    required: true
  },
  createdAt:{
     type: Date, required:true
  },
  updatedAt: {
    type: Date, required: true
  }
})

postSchema.plugin(timestamp);
module.exports = mongoose.model('POSTONE', postSchema);
