import { describe, it, expect } from "@jest/globals";
import { connectToDB, getDB } from "../config/database.ts";

describe.skip("Database Connection", () => {
  it("should connect to MongoDB successfully", async () => {
    await connectToDB();
    const db = await getDB();

    expect(db).toBeDefined();
  });
});
