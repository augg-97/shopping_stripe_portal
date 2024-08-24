import { SetupTest } from '../../setup.spec';

const setupTest = new SetupTest();

beforeAll(() => {
  setupTest.setup();
});

afterAll(async () => {
  await setupTest.clearDatabaseTest();
  // .then(() => done())
  // .catch((err) => {
  //   console.log("🚀 ~ afterAll ~ err:", err);
  //   done(err);
  // });
});

it('test', () => {
  expect(2).toEqual(2);
});
