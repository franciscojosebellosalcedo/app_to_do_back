import {Router} from "express";
import UserRouter from "./user";
import WorkAreaRouter from "./workArea";
import BoardRouter from "./board";
import LabelRouter from "./label";
import CardRouter from "./card";
import ListRouter from "./list";

const router=Router();

router.use("/user",UserRouter);
router.use("/workArea",WorkAreaRouter);
router.use("/board",BoardRouter);
router.use("/label",LabelRouter);
router.use("/card",CardRouter);
router.use("/list",ListRouter);

export default router;