import {Router} from "express";
import * as controller from "../controllers/item";

const router=Router();

router.post("/",controller.saveItem);
router.delete("/:id",controller.deleteItem);
router.put("/:id",controller.updateItem);
router.get("/",controller.getAllItems);
router.get("/:id",controller.getOneItem);

export default router;