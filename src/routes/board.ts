import {Router} from "express";
import * as controller from "../controllers/board";

const router=Router();

router.post("/",controller.saveBoard);
router.delete("/:id",controller.deleteBoard);
router.put("/:id",controller.updateBoard);
router.get("/",controller.getAllBoards);
router.get("/:id",controller.getOneBoard);

export default router;