import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import { createApp } from "../../app";
import mongoose from "mongoose";
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";

//테스트 순서를 바꿀 경우 제대로 작동하지 않습니다. 테스트 간 의존성 때문입니다.
describe("test", () => {
  let app: any;
  let token: string;
  let productId: string;
  let sellerId: string;
  beforeAll(async () => {
    app = createApp();
    await mongoose
      .connect(`${process.env.MONGODB_URL}`)
      .then(() => console.log("몽고디비 연결완료"));
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("products");
    await mongoose.connection.db.dropCollection("sellers");
    await mongoose.connection.db.dropCollection("markets");
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
    const result = await request(app).post("/api/v1/user/login").send({
      email: "092ws4uto@nnavver.com",
      password: "password11!",
    });
    expect(result.status).toBe(200);
    token = result.body.authorization;
  });

  test("셀러 등록: 성공", async () => {
    const result = await request(app)
      .post("/api/v1/user/seller")
      .send({
        seller_name: "우주가도와줌",
        account: "1234565",
        bank: "acco",
        contact: "nnnoe",
      })
      .set({ Authorization: token });
    expect(result.status).toBe(201);
    expect(result.body.seller_name).toBe("우주가도와줌");
  });

  test("마켓 등록: 성공", async () => {
    await request(app)
      .post("/api/v1/market/nation")
      .send({
        nation: "미국",
      })
      .expect(201)
      .expect({ message: "success" });
  });

  test("셀러 상품 등록: 성공", async () => {
    const result = await request(app)
      .post("/api/v1/seller/product")
      .send({
        product_name: "Rmx 청바지",
        category: "의류",
        price: 49900,
        description: "언제 어느때든 멋스러움",
        order_deadline: "20230118",
        nation: "미국",
      })
      .set({ Authorization: token });
    expect(result.status).toBe(201);
    expect(result.body.message).toBe("success");
  });

  test("상품 리스트 조회: 성공", async () => {
    const result = await request(app)
      .get("/api/v1/market/list")
      .query({ inputText: "청바지", page: 1 });
    console.log(result.body);
    let a = result.body.result[0];
    productId = a._id;
    expect(result.status).toBe(200);
    expect(a.nation).toBe("미국");
  });

  test("셀러 상품 수정: 성공", async () => {
    await request(app)
      .patch(`/api/v1/seller/product/${productId}`)
      .send({
        price: 100,
      })
      .set({ Authorization: token })
      .expect(201);
  });

  test("셀러 상품 상세 보기: 성공", async () => {
    const result = await request(app).get(
      `/api/v1/market/product/${productId}`
    );
    expect(result.status).toBe(200);
    expect(result.body.result.price).toBe(100);
  });

  test("셀러 상품 삭제: 성공", async () => {
    const result = await request(app)
      .delete(`/api/v1/seller/product/${productId}`)
      .set({ Authorization: token });
    expect(result.status).toBe(204);
  });
});
