const mongoose = require("mongoose");

const completedFormSchema = mongoose.Schema({
  _id: { type: String, required: true }, //This ID is going to be the id of the form
  userId: { type: String },
  username: { type: String },
  email: { type: String },
  name: { type: String, required: true, trimmed: true },
  lastName: { type: String, required: true, trimmed: true },
  phoneNumber: { type: String, require: true, trimmed: true },
  subject: { type: String, required: true, trimmed: true },
  location: { type: String, required: true, trimmed: true },
  day: { type: String, required: true, trimmed: true },
  time: { type: Number, required: true },
  status: { type: Boolean, required: true }, //This is either Completed or canceled,
  note: { type: String }
});

module.exports = mongoose.model("CompletedForm", completedFormSchema);
