import {Router} from "express";
import * as controller from "../controllers/list";

const router=Router();

router.post("/",controller.saveList);
router.delete("/:id",controller.deleteList);
router.put("/:id",controller.updateList);
router.get("/",controller.getAllList);
router.get("/:id",controller.getOneList);

export default router;