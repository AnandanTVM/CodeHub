const express = require('express');
const HomeController = require('../controller/homeController');
const {
  getBatchByHubControl,
  getNamesByBatchIdControl,
} = require('../controller/CommenController');

const router = express.Router();

router.post('/OT-Registration', HomeController.RegistrationController);
router.get('/batch/byHub', getBatchByHubControl);
router.get('/getName', getNamesByBatchIdControl);
module.exports = router;
