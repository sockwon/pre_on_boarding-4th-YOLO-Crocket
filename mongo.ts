import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const dbConnect = async () => {
  if (process.env.NODE_ENV === "production") {
    mongoose.set("debug", true);
  }

  mongoose.connect("mongodb://localhost:27017/admin", (error) => {
    if (error) {
      console.log("몽고디비 연결 에러", error);
    } else {
      console.log("몽고디비 연결 성공");
    }
  });

  mongoose.connection.on("error", (error) => {
    console.error("", error);
  });

  mongoose.connection.on("disconnect", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    dbConnect();
  });
};

export default dbConnect;
