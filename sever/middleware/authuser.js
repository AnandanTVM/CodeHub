const jwt = require("jsonwebtoken");

const adminprotect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = await Commenutil.findAdminById(decoded.userId);
      console.log(decoded.email);
      if (user.email === decoded.email) {
        req.user = user;
        next();
      } else {
        console.log("failed token");
        res.status(401);
        throw new Error("Not authorized, token fail");
      }
    } catch (error) {
      console.log(error);
      console.log("failed token");
      res.status(401);
      throw new Error("Not authorized, token fail");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Autherized");
  }
};
module.exports = {
  adminprotect,
};
