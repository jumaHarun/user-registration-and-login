import request from "supertest";
import { Application } from "express";
import { describe, it, expect, beforeAll, afterEach } from "@jest/globals";
import { createTestApp, deleteMany } from "../utils/testHelpers.ts";
import { createUser } from "../models/users.model.ts";

let app: Application;

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    // Connect to DB
    app = await createTestApp();
    // Clean up user collection before any test
    await deleteMany();
  });

  afterEach(async () => {
    // Clean up user collection after each test
    await deleteMany();
  });

  it("should return an error for missing email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please provide an email address");
  });

  it("should return an error for missing password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please provide a password");
  });

  it("should login a user and return a JWT token", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "testuser@example.com", password: "password123" });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("should return an error for invalid email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "wrongmail@example.com", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  it("should return an error for invalid password", async () => {
    await createUser({
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "password" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid password");
  });
});

describe("POST /api/auth/register", () => {
  beforeAll(async () => {
    // Connect to DB
    app = await createTestApp();
    // Clean up user collection before any test
    await deleteMany();
  });

  afterEach(async () => {
    // Clean up user collection after each test
    await deleteMany();
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
    await createUser({
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
