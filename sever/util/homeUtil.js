const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const db = require('../config/connection');
const collection = require('../config/collection');

module.exports = {
  oneTimeRegistration: (details) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PARTICIPANT_COLLECTION)
        .findOne({
          $or: [{ email: details.email }, { phone: details.phone }],
        })
        .then(async (userData) => {
          if (userData === null) {
            let userDetails = {
              batchId: ObjectId(details.batchId),
              name: details.name,
              email: details.email,
              phone: details.phone,
              otp: '',
              status: true,
            };
            db.get()
              .collection(collection.PARTICIPANT_COLLECTION)
              .insertOne(userDetails)
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            // User already exist
            reject({ message: 'Participant Already Exist..' });
          }
        })
        .catch((err) => reject(err));
    }),
};
