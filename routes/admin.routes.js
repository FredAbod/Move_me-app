const router = require("express").Router();
const {
    adminSignUp,
    adminLogin,
    allUsers,
    postReservation,
    userBookings,
  } = require("../controllers/admin.controllers");
  const {  validateAdmin, isAuth } = require("../middleware/isAuth");

  router.post("/signup", adminSignUp);
router.post("/login", adminLogin);
router.post("/postreservation", isAuth, validateAdmin, postReservation);
router.get("/userbookings", isAuth, validateAdmin, userBookings);
router.get("/allusers", isAuth, validateAdmin, allUsers);

module.exports = router;