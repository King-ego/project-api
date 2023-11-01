import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateImageService from "../../../services/CreateImageServices";

export default class ImagesController {
    public async createImage(req: Request, resp: Response):Promise<Response>{
        const {file} = req;
        const data = container.resolve(CreateImageService)
        const image = await data.execute(file);
        return resp.send(image)
    }
}