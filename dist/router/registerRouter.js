import { Router } from "express";
import { registerUser } from "../controller/registerController.js";
const registerRouter = Router();
registerRouter.post("/", registerUser);
export default registerRouter;
