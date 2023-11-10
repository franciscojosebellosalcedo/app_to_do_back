import {Router} from "express";
import * as controller from "../controllers/card";

const router=Router();

router.post("/",controller.saveCard);
router.delete("/:id",controller.deleteCard);
router.put("/:id",controller.updateCard);
router.get("/",controller.getAllCards);
router.get("/:id",controller.getOneCard);

export default router;