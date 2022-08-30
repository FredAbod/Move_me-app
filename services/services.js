const User = require("../models/user.models");
const user_reservation = require('../models/user.reservation');


exports.Services = {
  find: () => User.find({}),

  findUserByEmail: (id) => User.findOne(id),

  findUserById: async (id) => {
    const user = await User.findById(id);

    if (!user) throw new Error('User not found');
    return user;
  },
  signUp: async (data) => {
    const user = new User({ ...data });
    await user.save();
    if (!user) throw new Error('User not found');
    return user;
  },

  updateBookings: async (id, data) => {
    const updatedBookings = await user_reservation.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedBookings) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return updatedBookings;
  },
};
