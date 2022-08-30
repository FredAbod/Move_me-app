const router = require("express").Router();

const {
  signUp,
  loginUser,
  post_user_reservation,
  updateBooking,
  deleteBooking,
  ourServices,
} = require("../controllers/user.controllers");
const { isAuth } = require("../middleware/isAuth");

router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/reservation", isAuth, post_user_reservation);
router.put("/updatebooking", isAuth, updateBooking);
router.delete("/deletebooking", isAuth, deleteBooking);
router.get("/ourservices", isAuth, ourServices);

module.exports = router;