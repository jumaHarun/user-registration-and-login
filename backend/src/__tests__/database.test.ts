import {
  closeDatabaseConnection,
  connectToDatabase,
} from "../config/database.ts";

describe.skip("Database Connection", () => {
  afterAll(async () => {
    await closeDatabaseConnection();
  });

  it("should connect to MongoDB successfully", async () => {
    const db = await connectToDatabase();
    expect(db).toBeDefined();
  });
});
