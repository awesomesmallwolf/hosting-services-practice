import { Router } from "itty-router";
import { getData, signup, login } from "../controllers/User.controller";

const router = Router();

router.get("/:email", getData);
router.post("/signup", signup);
router.post("/login", login);

export default router;
