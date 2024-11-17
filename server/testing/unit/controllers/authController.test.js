import request from "supertest";
import path from "path";
import { app } from "../../../index.js";
import mongoose from "mongoose";

const __dirname = path.resolve();

describe("Auth Controller Unit Test", () => {
  afterAll(async () => {
    await mongoose.connection.close(); // Close the DB connection after tests
  });

  it("POST /auth/signup should create a user successfully when all fields are provided", async () => {
    const payload = {
      name: "Test Name",
      phoneNumber: "9069858451",
      email: "test@testing.com",
      password: "testing_password",
      role: "Attendee",
      dob: "2024-11-25",
      gender: "Male",
    };

    const res = await request(app)
      .post("/auth/signup")
      .field("name", payload.name)
      .field("phoneNumber", payload.phoneNumber)
      .field("email", payload.email)
      .field("password", payload.password)
      .field("role", payload.role)
      .field("dob", payload.dob)
      .field("gender", payload.gender)
      .attach("image", path.join(__dirname, "/upload/test.jpg")); // Ensure the file exists in this path

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body.user).toHaveProperty("email", payload.email);
    expect(res.body.user).toHaveProperty("name", payload.name);
    expect(res.body.user).toHaveProperty("profilePicture");
  });
});
