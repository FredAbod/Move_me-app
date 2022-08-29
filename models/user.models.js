const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
     
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    collection: "user_info",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
