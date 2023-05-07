// const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const db = require("../config/connection");
const collection = require("../config/collection");

module.exports = {
  getBactchByHub: (hub) =>
    new Promise(async (resolve, reject) => {
      try {
        const batch = await db
          .get()
          .collection(collection.BATCH_COLLECTION)
          .aggregate([
            { $match: { hub: hub } },
            {
              $project: {
                batch: 1,
                _id: 0,
              },
            },
          ])
          .toArray();
        if (batch.length === 0) {
          resolve("No Batch Found.");
        } else {
          resolve(batch);
        }
      } catch (error) {
        reject(error.message);
      }
    }),
};
