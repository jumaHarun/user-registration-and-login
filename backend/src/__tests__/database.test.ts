import { describe, it, expect } from "@jest/globals";
import db from "../utils/database/mongo.conn.ts";

describe.skip("Database Connection", () => {
  it("should connect to MongoDB successfully", async () => {
    expect(db).toBeDefined();
  });
});
