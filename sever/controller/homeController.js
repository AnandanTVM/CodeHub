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

const dailyLoginControl = (req, res) =>
  homeUtil
    .dailyLogin(req.body.userId)
    .then((response) => {
      const token = jwt.sign(
        {
          userId: response._id,
          name: response.name,
          email: response.email,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        statusCode: 200,
        result: { status: true, userToken: token },
      });
    })
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err.message },
      })
    );

module.exports = {
  RegistrationController,
  dailyLoginControl,
};
