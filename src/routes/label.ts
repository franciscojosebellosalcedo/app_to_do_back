import {Router} from "express";
import * as controller from "../controllers/label";

const router=Router();

router.post("/",controller.saveLabel);
router.delete("/:id",controller.deleteLabel);
router.put("/:id",controller.updateLabel);
router.get("/",controller.getAllLabels);
router.get("/:id",controller.getOneLabel);

export default router;