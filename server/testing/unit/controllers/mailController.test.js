import { app } from "../../../index.js";
import request from "supertest";

describe("Unit Test for Mailing", () => {
  const payload = { email: "rydhampreetsingh.gindra@gmail.com" };
  it("POST /email/send ", async () => {
    const response = await request(app)
      .post("/email/send")
      .send(payload)
      .set("Content-Type", "application/json");


      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        email: payload.email,
        status:"Success"
      });
  });
});
