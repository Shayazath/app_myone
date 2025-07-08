const mongoose = require('mongoose');

// Define the file schema
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now, // Automatically store the upload timestamp
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username :{
    type: String,
    required: true,
  },
  thumbnail:{
    type: Buffer,
    required: true,  // Optional field for thumbnail generation.
  },
  size:{
    type: String,
    required: true,  // Optional field for file size.
  },
  profilepic:{
    type: Buffer,
    required: true,  // Optional field for profile picture generation.
  }
});

// Create the File model
const File = mongoose.model('File', fileSchema);

module.exports = File;