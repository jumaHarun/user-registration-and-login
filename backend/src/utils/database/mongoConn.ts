import { Db, MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URI || "";
const dbName = process.env.MONGO_DB || "";

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    return;
  })
  .catch((err) => {
    console.error(err);
    return;
  });

const db = client.db(dbName);

export default db;
