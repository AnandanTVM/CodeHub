const express = require("express");
const adminController = require("../controller/adminController");
const auth = require("../middleware/authuser");

const router = express.Router();
router.post("/login", adminController.adminLogin);
router.post("/changePassword", adminController.changePassword);
router.post("/batch", auth.adminprotect, adminController.addBatch);
module.exports = router;
