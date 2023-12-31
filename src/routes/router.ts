import {Router} from "express";
import UserRouter from "./user";
import WorkAreaRouter from "./workArea";
import BoardRouter from "./board";
import LabelRouter from "./label";
import CardRouter from "./card";
import ListRouter from "./list";
import ItemRouter from "./item";
import CheckListRouter from "./checkList";

const router=Router();

router.use("/user",UserRouter);
router.use("/workArea",WorkAreaRouter);
router.use("/board",BoardRouter);
router.use("/label",LabelRouter);
router.use("/card",CardRouter);
router.use("/list",ListRouter);
router.use("/item",ItemRouter);
router.use("/checkList",CheckListRouter);

export default router;