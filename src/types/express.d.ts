declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      rol: string;
      email: string;
    };
  }
}
