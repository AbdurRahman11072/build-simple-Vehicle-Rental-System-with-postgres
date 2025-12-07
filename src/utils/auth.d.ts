export type AuthUser = {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
