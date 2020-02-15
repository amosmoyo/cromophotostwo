const mongoose = require('mongoose');

const validator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  name: {
    type: String, required:true
  },
  email: {
    type: String, required:true, unique: true
  },
  password: {
    type: String, required:true
  }
})

UserSchema.plugin(validator);

module.exports = mongoose.model('USERTWO', UserSchema);
