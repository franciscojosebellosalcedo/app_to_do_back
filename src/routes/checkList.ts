import {Router} from "express";
import * as controller from "../controllers/checkList";

const router=Router();

router.post("/",controller.saveCheckList);
router.delete("/:id",controller.deleteCheckList);
router.put("/:id",controller.updateCheckList);
router.get("/",controller.getAllCheckLists);
router.get("/:id",controller.getOneCheckList);

export default router;