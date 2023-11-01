export default interface IS3Storage {
    saveFile(filename: string):Promise<string>
}