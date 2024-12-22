import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
