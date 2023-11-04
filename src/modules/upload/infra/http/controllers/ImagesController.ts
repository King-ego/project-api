import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateImageService from "../../../services/CreateImageServices";
import * as process from "process";
import ListImagesServices from "../../../services/ListImagesServices";

export default class ImagesController {
    public async createImage(req: Request, resp: Response):Promise<Response>{
        const {file} = req;
        const data = container.resolve(CreateImageService)
        const image = await data.execute(file);
        const imageUrl = {...image, url: `${process.env.BUCKET_URL}${image.url}`}
        return resp.send( imageUrl)
    }

    public async index(_: Request, resp: Response):Promise<Response>{
        const data = container.resolve(ListImagesServices)
        const images = await data.execute();
        const imagesWithURL = images.map((image)=> {
            const imageURL = {...image, url: `${process.env.BUCKET_URL}${image.url}`}
            return imageURL;
        })
        /*const imageUrl = {...image, url: `${process.env.BUCKET_URL}${image.url}`}*/
        return resp.send( imagesWithURL)
    }
}