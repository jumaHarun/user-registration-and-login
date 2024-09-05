import { connectToDatabase } from "../config/database.ts";

describe.skip("Database Connection", () => {
  it("should connect to MongoDB successfully", async () => {
    const db = await connectToDatabase("userAuth");
    expect(db).toBeDefined();
  });
});
