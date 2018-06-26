const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true
  },
  dateEnrolled: { 
    type: Date
  },
  isAdmin: false,
  
});

const User = mongoose.model("User", articleSchema);

module.exports = User;