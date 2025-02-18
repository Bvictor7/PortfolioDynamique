const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { validateRequest } = require("../middlewares/validateRequest");

const {
  createUser,
  removeUser,
  getAllUsers,
  login,
  logout,
  updateUser,
} = require("../controllers/userController");

const {
  validateRegisterUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../validations/authValidations");

router.post("/login", login);
router.post("/register", validateRegisterUser, validateRequest, createUser);
router.post("/logout", auth, logout);
router.get("/", auth, isAdmin, getAllUsers);
router.put("/:id", auth, validateUpdateUser, validateRequest, updateUser);
router.delete("/:id", auth, validateDeleteUser, validateRequest, removeUser);

router.use(auth);
router.use(isAdmin);

module.exports = router;
