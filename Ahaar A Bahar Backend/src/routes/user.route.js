import { Router } from "express";
import { multerupload } from "../middlewares/multer.midlleware";

const router = Router();

router.route("/register").post(multerupload.single("avatar"));
