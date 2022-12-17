import { Router } from "itty-router";
import {
  create,
  getAll,
  getSpecific,
  update,
} from "../controllers/Task.controller";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getSpecific);
router.put("/:id", update);

export default router;
