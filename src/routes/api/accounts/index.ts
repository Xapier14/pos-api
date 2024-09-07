import { RequireToken } from "middleware";
import { Router } from "express";
import { PostRouter } from "./post";

const router = Router();
router.use(RequireToken);

// sub routes
router.use(PostRouter);

export { router as AccountsRouter };
