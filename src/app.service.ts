import { Inject, Injectable, Req } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AppService {
  constructor() {}

  ping(): { message: string } {
    return { message: "PONG" };
  }

  root() {
    // const result = this.userAgent.getResult();
    // const ua = req.headers["user-agent"];
    // const userAgent = new UAParser(ua);
    // const result = userAgent.getResult();
    // console.log(
    //   "🚀 ~ file: app.service.ts:14 ~ AppService ~ root ~ result:",
    //   result,
    // );
    // return result;
    return "hello";
  }
}
