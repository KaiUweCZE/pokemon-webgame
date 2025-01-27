import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcryptjs.compare(password, hashedPassword);
};
