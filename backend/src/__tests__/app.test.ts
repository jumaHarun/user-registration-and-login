import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import { createTestApp } from "../utils/testHelpers.ts";

describe.skip("GET /", () => {
  it('should return "Hello, World"', async () => {
    const app = await createTestApp();
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello, World!");
  });
});
