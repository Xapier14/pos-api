import { Router } from "express";
import { LoginRouter } from "./login";
import { AccountsRouter } from "./accounts";

const router = Router();

// sub routes
router.use("/login", LoginRouter);
router.use("/accounts", AccountsRouter);

export { router as ApiRouter };
