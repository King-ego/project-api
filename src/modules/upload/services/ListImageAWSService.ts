import {injectable, inject} from "tsyringe";
import IImageRepository from "../repositories/IImageRepository";
import IS3Storage from "../repositories/IS3Storage";
import AppError from "../../../shared/erros/AppError";
import {S3} from "aws-sdk";

@injectable()
class ListImageAWSService {
    constructor(
        @inject("ImagesRepository")
        private imagesRepository: IImageRepository,
        @inject("S3Storage")
        private s3Storage: IS3Storage,
    ) {
    }

    public async execute(fileUrl: string):Promise<S3.Types.GetObjectAclOutput> {

        const existImage = await this.imagesRepository.ImageByUrl(fileUrl)

        if (!existImage) throw new AppError("Image Not Found")

        const image = await this.s3Storage.getFile(fileUrl)
        return image;
    }
}

export default ListImageAWSService;