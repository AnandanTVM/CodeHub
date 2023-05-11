const jwt = require('jsonwebtoken');
const CommenUtil = require('../util/commenUtil');

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

const getNamesByBatchIdControl = (req, res) =>
  CommenUtil.getNamesByBatchId(req.query.batchId)
    .then((details) =>
      res.json({
        statusCode: 200,
        result: { status: true, Names: details },
      })
    )
    .catch((err) =>
      res.json({
        statusCode: 404,
        result: { status: false, message: err },
      })
    );
module.exports = {
  getBatchByHubControl,
  getNamesByBatchIdControl,
};
