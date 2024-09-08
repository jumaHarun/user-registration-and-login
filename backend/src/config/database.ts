import { ObjectId, MongoClient, Db } from "mongodb";
import { config } from "dotenv";
import mockUsers from "./mock_users.json";
import { isUserPassword, hashPassword } from "../utils/databaseHelpers.ts";

config({ path: "../.env" });

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please provide a MongoDB URL in the .env file");
}
const client = new MongoClient(uri);

const dbName = "userAuth";
let db: Db;

export const connectToDB = async () => {
  try {
    await client.connect();
    db = client.db(dbName);

    console.log(`Connected to the ${dbName} database.`);
  } catch (error) {
    console.error(`Error connecting to database:\n${error}`);
    process.exit(1);
  }
};

export const getDB = async (): Promise<Db> => {
  if (db == undefined) {
    await connectToDB();
  }
  return db;
};

export const closeClient = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error(`Error closing connection:\n${error}`);
    process.exit(1);
  }
};

interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

export const addMockUsers = async () => {
  try {
    if (db == undefined) {
      await connectToDB();
    }

    const usersWithHashedPassword: User[] = [];
    for await (const { email, password } of mockUsers) {
      const hashedPassword = await hashPassword(password, 10);

      usersWithHashedPassword.push({ email, password: hashedPassword });
    }

    const result = await db
      .collection("users")
      .insertMany(usersWithHashedPassword);

    console.log(`Added ${result.insertedCount} users successfully.`);
  } catch (err) {
    console.error(`Error adding mock users:\n${err}`);
    process.exit(1);
  } finally {
    await closeClient();
  }
};

interface DbUser extends User {
  compare: boolean;
  userPass: string;
}
export const getAllUsersFromDB = async (): Promise<DbUser[]> => {
  try {
    const db = await getDB();

    const result = await db.collection<User>("users").find({}).toArray();

    const usersWithComparedPassword: DbUser[] = await Promise.all(
      result.map(async ({ email, password }, index) => {
        const userPass = mockUsers[index].password;
        const compare = await isUserPassword(userPass, password);
        return {
          email,
          password,
          userPass,
          compare,
        };
      })
    );

    return usersWithComparedPassword;
  } catch (err) {
    console.error(`Error getting all users from database:\n${err}`);
    process.exit(1);
  } finally {
    await closeClient();
  }
};
// addMockUsers()
//   .then(connectToDB)
//   .then(getAllUsersFromDB)
//   .then((users) => console.log(users.slice(0, 7)));
