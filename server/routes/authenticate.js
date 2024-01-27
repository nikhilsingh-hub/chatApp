const {
  userLogin,
  userRegister,
  getAllUsers,
  setUserProfile,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/allusers/:id", getAllUsers);
router.post("/setprofile/:id", setUserProfile);
router.get("/logout/:id", logOut);

module.exports = router;
