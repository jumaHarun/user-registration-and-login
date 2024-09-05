import request from "supertest";
import { Application } from "express";
import { createTestApp } from "../utils/testHelpers.ts";
import User from "../models/User.ts";
import { closeDatabaseConnection } from "src/config/database.ts";

describe("POST /api/auth/register", () => {
  let app: Application;
  beforeAll(async () => {
    // Connect to DB
    app = await createTestApp();
  });

  afterEach(async () => {
    // Clean up user collection after each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    // Close the connection after all tests
    await closeDatabaseConnection();
  });

  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should return an error if the email is already registered", async () => {
    await User.create({
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already registered");
  });
});
