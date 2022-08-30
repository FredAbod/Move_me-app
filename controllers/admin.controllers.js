const User = require("../models/user.models");
const Reservation = require("../models/reservation.models");
const { passwordHash, passwordCompare } = require("../helper/hashing");
const { jwtSign } = require("../helper/jwt");
const {
  signUpValidation,
  loginValidation,
} = require("../validation/validation");
const { Services } = require("../services/services");
const user_reservation = require("../models/user.reservation");

exports.adminSignUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      req.body;
    const validation = signUpValidation(req.body);
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }

    const hashedPassword = await passwordHash(password);

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    };
    const new_admin = await Services.signUp(data);
    return res
      .status(201)
      .json({ message: "admin added successfully", new_admin: new_admin._id });
  } catch (error) {
    next(error);
  }
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validation = loginValidation(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    const admin = await Services.findUserByEmail({ email });
    const isMatch = await passwordCompare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const payload = {
      id: admin._id,
    };
    const token = jwtSign(payload);
    res.cookie("access_token", token, { httpOnly: true });
    const dataInfo = {
      status: "success",
      message: "Admin Logged in successful",
      access_token: token,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    next(error);
  }
};

exports.allUsers = async (req, res, next) => {
  try {
    //destructured req.query
    const { page, limit } = req.query;
    const user = await User.find({role:"user"})
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit) // 0 * 5 // skip 0
      .limit(limit * 1);
    return res.status(200).json({ count: user.length, data: user });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.postReservation = async (req, res, next) => {
  try {
    const { trainSeats, coach, bookingPeriod, train_destination_from_to } =
      req.body;
    const newReservation = new Reservation({
      trainSeats,
      coach,
      bookingPeriod,
      train_destination_from_to,
    });
    const saved_reservation = await newReservation.save();
    return res.status(201).json(saved_reservation);
  } catch (error) {
    next(error);
  }
};

exports.userBookings = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const user_bookings = await user_reservation
      .find()
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit * 1);

    return res
      .status(200)
      .json({ count: user_bookings.length, data: user_bookings });
  } catch (error) {
    next(error);
  }
};
