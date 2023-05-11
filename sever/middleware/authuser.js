const jwt = require('jsonwebtoken');
const adminUtil = require('../util/adminUtil');

const adminprotect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // let user = await
      adminUtil
        .findAdminById(decoded.userId)
        .then((details) => {
          if (details.email === decoded.email) {
            req.user = details;
            next();
          } else {
            console.log('failed token');
            res.status(401);
            return res.status(400).json({
              status: 400,
              result: { message: 'Not authorized, token fail' },
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({
            status: 400,
            result: { message: 'Not authorized, token fail' },
          });
        });
    } catch (error) {
      console.log(error);
      console.log('failed token');

      return res.status(400).json({
        status: 400,
        result: { message: 'Not authorized, token fail' },
      });
    }
  }

  if (!token) {
    return res
      .status(400)
      .json({ status: 400, result: { message: 'Invalid Token' } });
  }
};
module.exports = {
  adminprotect,
};
