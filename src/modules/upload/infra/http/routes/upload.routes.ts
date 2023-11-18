import {Router} from "express";
import ImagesController from "../controllers/ImagesController";
import multer from "multer";
import multerConfig from "../../../../../config/multer"
import auth from "../../../../users/infra/http/middleware/auth";

const uploadRoutes = Router();
const imageController = new ImagesController();

const upload = multer(multerConfig);

uploadRoutes.post("/images", auth, upload.single("image"), imageController.createImage)
uploadRoutes.get("/images", auth, imageController.index)
uploadRoutes.get("/imagesOnly", auth, imageController.getImage)

export default uploadRoutes;