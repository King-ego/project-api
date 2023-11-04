import Images from "../infra/typeorm/entities/Images";

export default interface IImageRepository {
    createImage(name: string):Promise<Images>
    list():Promise<Images[]>
}