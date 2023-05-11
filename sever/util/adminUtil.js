const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const db = require('../config/connection');
const collection = require('../config/collection');
const { password } = require('../middleware/redamPassword');

module.exports = {
  douserLogin: (userData) =>
    new Promise(async (resolve, reject) => {
      const response = {};
      const user = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
        .findOne({ email: userData.email });

      if (user) {
        bcrypt
          .compare(userData.password, user.password)
          .then((status) => {
            if (status) {
              response.user = user;
              resolve(response);
            } else {
              reject({ message: 'Incorrect Password.' });
            }
          })
          .catch((err) => reject({ message: err.message }));
      } else {
        reject({ message: 'User Not Found.' });
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

  findAdminById: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const adminDetails = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne(ObjectId(id));
        resolve(adminDetails);
      } catch (error) {
        reject(error.message);
      }
    }),

  addBatch: (batch, hub) =>
    new Promise((resolve, reject) => {
      details = {
        hub: hub,
        batch: batch,
        createdDate: new Date(),
        updatedDate: new Date(),
        status: true,
      };
      db.get()
        .collection(collection.BATCH_COLLECTION)
        .insertOne(details)
        .then(() => resolve())
        .catch((err) => reject(err.message));
    }),

  addQuestion: (data) =>
    new Promise(async (resolve, reject) => {
      let randomPassword = password();
      details = {
        question: data.question,
        example: data.example,
        time: data.time,
        releasedate: data.releasedate,
        password: randomPassword,
        createdDate: new Date(),
        updatedDate: new Date(),
        status: true,
      };
      // console.log(details);
      db.get()
        .collection(collection.QUESTION_COLLECTION)
        .insertOne(details)
        .then(() => resolve())
        .catch((err) => reject(err.message));
    }),
};
