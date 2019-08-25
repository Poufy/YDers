const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  subject: { type: String, required: true },
  locatuion: { type: String, required: true },
  time: { type: Number, required: true }
});

module.exports = mongoose.model("Teacher", teacherSchema);
