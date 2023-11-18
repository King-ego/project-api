import {injectable, inject} from "tsyringe";
import IImageRepository from "../repositories/IImageRepository";
import IS3Storage from "../repositories/IS3Storage";
import AppError from "../../../shared/erros/AppError";
import Images from "../infra/typeorm/entities/Images";

@injectable()
class CreateImageService {
    constructor(
        @inject("ImagesRepository")
        private imagesRepository: IImageRepository,
        @inject("S3Storage")
        private s3Storage: IS3Storage,
    ) {
    }

    public async execute(file?: Express.Multer.File):Promise<Images> {
        if(!file) throw new AppError("File not send");
        await this.s3Storage.saveFile(file.filename)
        const image = await this.imagesRepository.createImage(file.filename)
        return image;
    }
}

export default CreateImageService;