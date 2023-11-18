import aws,{S3} from "aws-sdk";
import path from "path";
import mime from "mime";

import multerConfig from "../../../../../config/multer";
import AppError from "../../../../../shared/erros/AppError";
import * as fs from "fs";
import IS3Storage from "../../../repositories/IS3Storage";
import * as process from "process";
/*import {inject, injectable} from "tsyringe";
import IImageRepository from "../modules/upload/repositories/IImageRepository";*/

class S3Storage implements IS3Storage{
    private client: S3

    constructor(
    ) {
        this.client = new aws.S3({
            region: process.env.AWS_DEFAUL_REGION,
            apiVersion: "2012-10-17"
        })
    }

    async saveFile(filename: string):Promise<string>{
        const originalPath = path.resolve(multerConfig.directory, filename);
        const contentType = (mime as unknown as any).getType(originalPath)

        if (!contentType) {
            throw new AppError("File not found", 404)
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            ACL: "public-read",
            Bucket: process.env.AWS_BUCKET,
            Key: filename,
            Body: fileContent,
        }).promise();

        await fs.promises.unlink(originalPath)

        return filename;
    }
    async getFile(filename: string):Promise<S3.Types.GetObjectAclOutput>{
        const awsImage = await this.client.getObject({
            Bucket: process.env.AWS_BUCKET,
            Key: filename,
        }).promise();

        return awsImage
    }
}

export default S3Storage