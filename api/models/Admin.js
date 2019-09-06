const mongoose = require("mongoose");

//Schema

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  masterPassword: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);
