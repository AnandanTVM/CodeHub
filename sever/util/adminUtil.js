const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const db = require("../config/connection");
const collection = require("../config/collection");

module.exports = {
  douserLogin: (userData) =>
    new Promise(async (resolve) => {
      const response = {};
      const user = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
        .findOne({ email: userData.email });

      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    }),
  changePassword: (userDetails) =>
    new Promise(async (resolve, reject) => {
      const bypassword = await bcrypt.hash(userDetails.password, 10);
      db.get()
        .collection(collection.ADMIN_COLLECTION)
        .updateOne(
          { email: userDetails.email },
          { $set: { password: bypassword } }
        )
        .then(() => resolve())
        .catch((err) => reject(err));
    }),
};
