const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, trimmed: true },
  lastName: { type: String, required: true, trimmed: true },
  phoneNumber: { type: String, require: true, trimmed: true },
  subject: { type: String, required: true, trimmed: true },
  location: { type: String, required: true, trimmed: true },
  day: { type: String, required: true, trimmed: true },
  time: { type: Number, required: true }
});

module.exports = mongoose.model("Form", formSchema);
