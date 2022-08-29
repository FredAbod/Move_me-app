const router = require("express").Router();

const {
  signUp,
  loginUser,
  post_user_reservation,
  updateBooking,
  deleteBooking,
  ourServices,
} = require("../controllers/user.controllers");
const { userIsAuth } = require("../middleware/isAuth");

router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/reservation", userIsAuth, post_user_reservation);
router.put("/updatebooking", userIsAuth, updateBooking);
router.delete("/deletebooking", userIsAuth, deleteBooking);
router.get("/ourservices", userIsAuth, ourServices);

module.exports = router;