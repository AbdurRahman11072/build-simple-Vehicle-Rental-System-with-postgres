export type signupUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "customer";
};

export type signinUser = {
  email: string;
  password: string;
};
