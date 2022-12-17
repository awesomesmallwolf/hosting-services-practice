import { Router } from "itty-router";
import { get, create, update } from "../controllers/News.controller";

const router = Router();

router.get("/", get);
router.post("/", create);
router.put("/:id", update);

export default router;
