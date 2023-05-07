const jwt = require("jsonwebtoken");
const adminUtil = require("../util/adminUtil");
const { response } = require("express");

const adminLogin = (req, res) =>
  adminUtil
    .douserLogin(req.body)
    .then((response) => {
      const token = jwt.sign(
        {
          userId: response.user._id,
          name: response.user.name,
          email: response.user.email,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        statusCode: 200,
        result: { status: true, user: token },
      });
    })
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err.message },
      })
    );

const addBatch = (req, res) => {
  console.log("here");
};

const changePassword = (req, res) =>
  adminUtil
    .changePassword(req.body)
    .then(() =>
      res.json({ status: true, result: { message: "Password Changed." } })
    );
module.exports = {
  adminLogin,
  changePassword,
  addBatch,
};
