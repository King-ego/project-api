import {Router} from "express";
import ImagesController from "../controllers/ImagesController";

const uploadRoutes = Router();
const imageController = new ImagesController()

uploadRoutes.post("/images", imageController.createImage)

export default uploadRoutes;