import { AuthUser } from '../services/tokenService/authUser';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
    }
  }
}
