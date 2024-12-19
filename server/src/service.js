import { db } from "./mongodb.js";
import { InputError, AccessError } from "./error.js";

export const getUserSession = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ user: id });
      return resolve({ session: user.session });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });
