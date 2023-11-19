import {Router} from "express";
import * as controller from "../controllers/workArea";
import { checkAuthorization } from "../middlewares/authorization";

const router=Router();

router.post("/",checkAuthorization,controller.saveWorkArea);
router.put("/new-member/:id",checkAuthorization,controller.addNewMember);
router.delete("/:id",checkAuthorization,controller.deleteWorkArea);
router.put("/:id",checkAuthorization,controller.updateWorkArea);
router.get("/:idUser",checkAuthorization,controller.getAllWorksArea);
router.get("/:id/:idUser",checkAuthorization,controller.getOneWorkArea);

export default router;