const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:
  {
    type: String,
  },
  firstName:
  {
    type:String,
  },
  lastName:
  {
    type:String
  }

});

const User = mongoose.model("users", UserSchema);

module.exports = User;