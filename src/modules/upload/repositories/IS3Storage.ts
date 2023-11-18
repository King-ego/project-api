import {S3} from "aws-sdk";

export default interface IS3Storage {
    saveFile(filename: string):Promise<string>
    getFile(filename: string):Promise<S3.Types.GetObjectAclOutput>
}