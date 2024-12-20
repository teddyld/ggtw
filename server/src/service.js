import { db } from "./mongodb.js";
import { InputError, AccessError } from "./error.js";

export const getUserProgram = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ user: id });
      return resolve({ program: user.program });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateUserProgram = async (id, program) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      await collection.updateOne({ user: id }, { $set: { program: program } });
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });
