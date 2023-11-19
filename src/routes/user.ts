import {Router} from "express";
import * as controller from "../controllers/user";

const router=Router();

router.post("/",controller.saveUser);
router.post("/login",controller.userLogin);
router.delete("/:id",controller.deleteUser);
router.put("/:id",controller.updateUser);
router.get("/",controller.getAllUsers);
router.get("/refress-token",controller.getNewAccessToken);

export default router;