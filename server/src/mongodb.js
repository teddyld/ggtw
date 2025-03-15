import mongoose from "mongoose";
import "dotenv/config";

const { Schema, model } = mongoose;

const activitySchema = new Schema({
  weight: Number,
  reps: Number,
  time: Number,
  units: String,
});

const personalBestsSchema = new Schema({
  weight: Number,
  reps: Number,
  time: Number,
  units: String,
  date: String,
});

const setSchema = new Schema({
  id: String,
  values: {
    reps: Number,
    weight: Number,
    time: Number,
  },
});

const exerciseSchema = new Schema({
  id: String,
  name: String,
  muscleGroups: [String],
  types: {
    reps: Boolean,
    time: Boolean,
  },
  units: String,
  setOrder: [String],
  setCount: Number,
  sets: {
    type: Map,
    of: setSchema,
  },
});

const workoutSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  lastAccessed: String,
  exercises: {
    type: Map,
    of: exerciseSchema,
  },
  exerciseOrder: [String],
  exerciseCount: Number,
});

const usersSchema = new Schema({
  user: {
    type: String,
    unique: true,
  },
  settings: {
    units: String,
  },
  statistics: {
    startDate: String,
    activity: {
      type: Map,
      of: {
        type: Map,
        of: [activitySchema],
      },
    },
    exercises: {
      type: Map,
      of: [String],
    },
    personalBests: {
      type: Map,
      of: personalBestsSchema,
    },
  },
  workouts: {
    type: Map,
    of: workoutSchema,
  },
});

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("🚀 Connected to MongoDB");
  } catch (err) {
    console.error(`Error running MongoDB: ${err.message}`);
  }
}

run().catch(console.dir);

export const db = model("user", usersSchema);
