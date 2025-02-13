const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");


// controllers
const {
  createUser,
  removeUser,
  getAllUsers,
  login,
  logout
} = require("../controllers/userController");


const protect = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const{ validateRequest } = require("../middlewares/validateRequest");

const {
  validateRegisterUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../validations/authValidations");

router.post("/register", validateRegisterUser, validateRequest, createUser);  
router.put("/:id", auth, validateUpdateUser, validateRequest, removeUser);  
router.delete("/:id", auth, validateDeleteUser, validateRequest, removeUser);  
router.post("/login", login);  
router.post("/logout", auth, logout);  
module.exports = router;
