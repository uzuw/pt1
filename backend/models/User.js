const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  avatar: String,
  email: String,
  password:String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
