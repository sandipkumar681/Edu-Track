import dotenv from "dotenv";

const devOrProd = process.env.NODE_ENV || "development";

dotenv.config({
  path: `./.env.${devOrProd}`,
});
