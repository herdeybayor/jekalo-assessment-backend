const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name_prefix: String,
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
