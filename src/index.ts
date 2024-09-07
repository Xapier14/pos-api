import express, { Express, Request, Response } from "express";
import { Config } from "./config";
import multer from "multer";
import { BaseRouter } from "./routes";

const app: Express = express();
const port = Config.Port ?? 3000;

// middlewares
app.use(multer().any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BaseRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
