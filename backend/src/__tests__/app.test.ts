import request from "supertest";
import { closeDatabaseConnection } from "../config/database.ts";
import { createTestApp } from "../utils/testHelpers.ts";

describe("GET /", () => {
  afterAll(async () => {
    await closeDatabaseConnection();
  });

  it('should return "Hello, World"', async () => {
    const app = await createTestApp();
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello, World!");
  });
});
