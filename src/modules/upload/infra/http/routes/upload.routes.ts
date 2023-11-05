import {Router} from "express";
import ImagesController from "../controllers/ImagesController";
import multer from "multer";
import multerConfig from "../../../../../config/multer"

const uploadRoutes = Router();
const imageController = new ImagesController();

const upload = multer(multerConfig);

uploadRoutes.post("/images", upload.single("image") ,imageController.createImage)
uploadRoutes.get("/images",imageController.index)
uploadRoutes.get("/imagesOnly",imageController.getImage)

export default uploadRoutes;