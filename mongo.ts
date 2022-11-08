import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const dbConnect = async () => {
  if (process.env.NODE_ENV === "production") {
    console.log("몽고디비 디버깅 모드");
    mongoose.set("debug", true);
  }

  mongoose.connect(`${process.env.MONGODB_URL}`, (error) => {
    if (error) {
      console.log("몽고디비 연결 에러", error);
    } else {
      console.log("몽고디비 연결 성공");
    }
  });

  mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 실패", error);
  });

  mongoose.connection.on("disconnect", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    dbConnect();
  });
};

export default dbConnect;
