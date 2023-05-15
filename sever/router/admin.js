const express = require("express");
const adminController = require("../controller/adminController");
const auth = require("../middleware/authuser");

const router = express.Router();
router.post("/login", adminController.adminLoginControl);
router.post("/changePassword", adminController.changePasswordControl);
router.post("/batch", auth.adminprotect, adminController.addBatchControl);
router.get(
  "/batch/byHub",
  auth.adminprotect,
  adminController.getBatchByHubControl
);
router.post("/question", auth.adminprotect, adminController.addQuestionControl);
router.get(
  "/question",
  auth.adminprotect,
  adminController.getAllQuestionControl
);
module.exports = router;
