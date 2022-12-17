import { Router } from "itty-router";
import { get, create, update } from "../controllers/Detail.controller";

const router = Router();

router.get("/:email", get);
router.post("/", create);
router.put("/:id", update);

export default router;
