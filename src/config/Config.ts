import dotenv from "dotenv";

dotenv.config();

export const Config = {
  MongoDbUri: process.env.MONGO_DB_URI,
  Port: process.env.PORT,
};
