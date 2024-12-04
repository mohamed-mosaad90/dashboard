const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  name: String,

  email: { type: String, unique: true },
  password: String,
  role: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("AdminUser", adminUserSchema);
