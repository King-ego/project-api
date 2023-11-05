import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateImageService from "../../../services/CreateImageServices";
import * as process from "process";
import ListImageAWSService from "../../../services/ListImageAWSService";
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
       /* const imagesWithURL = images.map((image)=> {
            const imageURL = {...image, url: `${process.env.BUCKET_URL}${image.url}`}
            return imageURL;
        })*/
        /*const imageUrl = {...image, url: `${process.env.BUCKET_URL}${image.url}`}*/
        return resp.send( images)
    }

    public async getImage(req:Request<{},{},{},{filename: string}>, resp: Response ):Promise<Response> {
        const {filename} = req.query;
        console.log(filename)
        const data = container.resolve(ListImageAWSService);
        const image = await data.execute(filename);
        console.log({image: (image as unknown as any).Body})
        return resp.send((image as unknown as any).Body)
    }
}