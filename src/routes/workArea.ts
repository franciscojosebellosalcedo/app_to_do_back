import {Router} from "express";
import * as controller from "../controllers/workArea";

const router=Router();

router.post("/",controller.saveWorkArea);
router.put("/new-member/:id",controller.addNewMember);
router.delete("/:id",controller.deleteWorkArea);
router.put("/:id",controller.updateWorkArea);
router.get("/",controller.getAllWorksArea);
router.get("/:id",controller.getOneWorkArea);

export default router;