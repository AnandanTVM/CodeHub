const jwt = require("jsonwebtoken");
const adminUtil = require("../util/adminUtil");
const CommenUtil = require("../util/commenUtil");
const { response } = require("express");

const adminLoginControl = (req, res) =>
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

const addBatchControl = (req, res) => {
  adminUtil
    .addBatch(req.body.batch, req.body.hub)
    .then(() =>
      res.json({
        statusCode: 200,
        result: { status: true, message: "Batch added." },
      })
    )
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err },
      })
    );
};

const changePasswordControl = (req, res) =>
  adminUtil
    .changePassword(req.body)
    .then(() =>
      res.json({ status: true, result: { message: "Password Changed." } })
    );

const getBatchByHubControl = (req, res) =>
  CommenUtil.getBactchByHub(req.query.hub)
    .then((details) =>
      res.json({
        statusCode: 200,
        result: { status: true, Batch: details },
      })
    )
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err },
      })
    );

const addQuestionControl = (req, res) =>
  adminUtil
    .addQuestion(req.body)
    .then(() =>
      res.json({
        statusCode: 200,
        result: { status: true, message: "Question Added." },
      })
    )
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err },
      })
    );

const getAllQuestionControl = (req, res) =>
  adminUtil
    .getAllQuestion()
    .then((question) =>
      res.json({
        statusCode: 200,
        result: { status: true, questions: question },
      })
    )
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err },
      })
    );

module.exports = {
  adminLoginControl,
  changePasswordControl,
  addBatchControl,
  getBatchByHubControl,
  addQuestionControl,
  getAllQuestionControl,
};
