const express = require('express');
const adminController = require('../controller/adminController');
const auth = require('../middleware/authuser');
const { getBatchByHubControl } = require('../controller/CommenController');

const router = express.Router();

router.post('/login', adminController.adminLoginControl);
router.post('/changePassword', adminController.changePasswordControl);
router.post('/batch', auth.adminprotect, adminController.addBatchControl);
router.get('/batch/byHub', auth.adminprotect, getBatchByHubControl);
router.post(
  '/addQuestion',
  auth.adminprotect,
  adminController.addQuestionControl
);
module.exports = router;
