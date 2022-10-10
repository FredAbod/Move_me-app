const user_reservation = require("../models/user.reservation");
const {
  signUpValidation,
  loginValidation,
} = require("../validation/validation");
const { Services } = require("../services/services");
const { passwordHash, passwordCompare } = require("../helper/hashing");
const { jwtSign } = require("../helper/jwt");
const Reservation = require("../models/reservation.models");
const QRCode = require("qrcode");

exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
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
    };
    const new_user = await Services.signUp(data);
    return res
      .status(201)
      .json({ message: "user added successfully", new_user: new_user._id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Email or PhoneNumber Already Exist" });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validation = loginValidation(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    const user = await Services.findUserByEmail({ email });
    const isMatch = await passwordCompare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const payload = {
      id: user._id,
    };
    const token = jwtSign(payload);
    res.cookie("access_token", token, { httpOnly: true });
    const dataInfo = {
      status: "success",
      message: "Login successful",
      access_token: token,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    next(error);
  }
};

exports.post_user_reservation = async (req, res, next) => {
  try {
    const {
      trainSeat,
      coach,
      your_destination_from_to,
      depature_date_and_time,
    } = req.body;
    const newReservation = new user_reservation({
      trainSeat,
      coach,
      your_destination_from_to,
      depature_date_and_time,
    });
    const saved_reservation = await newReservation.save();

     QRCode.toFile("../saved_reservation.png", saved_reservation);

    // generateQR([newReservation]);
    return res
      .status(201)
      .json({ saved_reservation, message: "train seat booked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Train Seat Already Booked" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const id = req.query.id;
    const {
      trainSeat,
      coach,
      your_destination_from_to,
      depature_date_and_time,
    } = req.body;
    const updatedBooking = await user_reservation.findByIdAndUpdate(
      id,
      {
        trainSeat,
        coach,
        your_destination_from_to,
        depature_date_and_time,
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Booking Updated Successfully", updatedBooking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deleted_user_reservation = await user_reservation.findByIdAndDelete(
      id
    );
    return res.status(200).json({
      message: "Booking Deleted Successfully",
      deleted_user_reservation,
    });
  } catch (error) {
    next(error);
  }
};

exports.ourServices = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const all_Reservations = await Reservation.find()
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit * 1);

    return res
      .status(200)
      .json({ count: all_Reservations.length, data: all_Reservations });
  } catch (error) {
    next(error);
  }
};
