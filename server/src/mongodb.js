import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

export const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("🚀 Connected to MongoDB");
  } catch (err) {
    console.error(`Error running MongoDB: ${err.message}`);
  }
}

run().catch(console.dir);

export const db = client.db("ggtw");
