import {Router} from "express";
import * as controller from "../controllers/board";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveBoard);
router.delete("/:id",checkAuthorization,controller.deleteBoard);
router.put("/:idWorkArea/:idBoard",checkAuthorization,controller.updateBoard);
router.get("/",checkAuthorization,controller.getAllBoards);
router.get("/:id",checkAuthorization,controller.getOneBoard);
router.get("/:idUser",checkAuthorization,controller.getAllBoardOnlyFavorite);

export default router;