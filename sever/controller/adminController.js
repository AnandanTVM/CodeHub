const jwt = require("jsonwebtoken");
const adminUtil = require("../util/adminUtil");
const { response } = require("express");

const adminLogin = (req, res) =>
  adminUtil.douserLogin(req.body).then((response) => {
    if (response.status) {
      const token = jwt.sign(
        {
          userId: response.user._id,
          name: response.user.name,
          email: response.user.email,
        },
        process.env.JWT_SECRET
      );
      return res.json({ status: "ok", user: token });
    }
    res.json({ status: "error", user: false });
  });

const changePassword = (req, res) =>
  adminUtil
    .changePassword(req.body)
    .then(() =>
      res.json({ status: true, result: { message: "Password Changed." } }))
module.exports = {
  adminLogin,
  changePassword,
};
