import express, { Express, Request, Response } from "express";
import { Config } from "./config";
import multer from "multer";
import cors from "cors";
import { BaseRouter } from "./routes";
import { Auth } from "services";
import { hashSync } from "bcrypt";

const app: Express = express();
const port = Config.Port ?? 3000;

// middlewares
app.use(cors());
app.use(multer().any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BaseRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
