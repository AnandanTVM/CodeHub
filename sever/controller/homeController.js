const jwt = require('jsonwebtoken');

const homeUtil = require('../util/homeUtil');

const RegistrationController = (req, res) =>
  homeUtil
    .oneTimeRegistration(req.body)
    .then(() =>
      res.json({
        statusCode: 200,
        result: { status: true, message: 'Registration Successful' },
      })
    )
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err },
      })
    );

module.exports = {
  RegistrationController,
};
