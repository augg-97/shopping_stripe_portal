// import { INestApplication } from "@nestjs/common";
// import { PrismaService } from "@services/prismaService/prisma.service";
// import { Test, TestingModule } from "@nestjs/testing";
// import { setupTestApp } from "../../../setup.spec";
// import request from "supertest";
// import { AppModule } from "../../../app.module";

// describe("[GET] /users/me", () => {
//   const url = `localhost:3002/api/v1/users/me`;
//   let prismaService: PrismaService;
//   let app: INestApplication;
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = module.createNestApplication();
//     await setupTestApp(app);
//     prismaService = app.get<PrismaService>(PrismaService);
//     await app.init();
//   });

//   afterEach(async () => {
//     await prismaService.user.deleteMany();
//   });

//   it("Should throw unauthorized exception when not attach Bearer token", async () => {
//     const response = await request(url).post("").send({});
//   });
// });
