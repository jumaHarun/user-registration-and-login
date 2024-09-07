import request from "supertest";
import { Application } from "express";
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from "@jest/globals";
import { createTestApp } from "../utils/testHelpers.ts";
import { deleteMany, createUser } from "../repos/userRepo.ts";
import { closeClient } from "../config/database.ts";

let app: Application;

describe("POST /api/auth/register", () => {
  beforeAll(async () => {
    // Connect to DB
    app = await createTestApp();
    await deleteMany();
  });

  afterEach(async () => {
    // Clean up user collection after each test
    await deleteMany();
  });

  afterAll(async () => {
    await closeClient();
  });

  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.user).toBeDefined();
  });

  it("should return an error if the email is already registered", async () => {
    await createUser("testuser@example.com", "password123");

    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already registered");
  });
});
