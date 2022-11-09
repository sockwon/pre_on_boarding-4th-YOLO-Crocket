import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import { createApp } from "../../app";
import mongoose from "mongoose";
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";

describe("user", () => {
  let app: any;
  beforeAll(async () => {
    app = createApp();
    await mongoose
      .connect(`${process.env.MONGODB_URL}`)
      .then(() => console.log("몽고디비 연결완료"));
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.disconnect();
  });

  test("회원가입: 성공", async () => {
    await request(app)
      .post("/api/v1/user/signup")
      .send({
        name: "fkfkfk",
        phone: "1112222339",
        email: "092ws4uto@nnavver.com",
        password: "password11!",
      })
      .expect(201)
      .expect({ message: "success" });
  });

  test("로그인: 성공", async () => {
    await request(app)
      .post("/api/v1/user/login")
      .send({
        email: "092ws4uto@nnavver.com",
        password: "password11!",
      })
      .expect(200);
  });
});
