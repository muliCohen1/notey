const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  heading: { type: String }, //remove this required as it prevents sending only heading/description
  description: { type: String },
  _id: { type: String, required: true },
}, {
  timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;