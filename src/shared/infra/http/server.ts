import express, {Request, Response} from 'express';
import cors from "cors";
import DataSource from "../typeorm/config";

const app = express();
const port = 3000; // Porta em que a API irá rodar
app.use(cors());
app.use(express.json());

app.get("/", (_:Request, res:Response)=>{
    res.send("ola")
})

// Defina suas entidades do TypeORM aqui

app.listen(3001, () => {
    console.log("Server started on port 3333!");
});
DataSource.initialize()
    .then(() => {
        console.log("Type ORM initialized");

        app.use(cors());
        app.use(express.json());


        app.listen(3333, () => {
            console.log("Server started on port 3333!");
        });
    })
    .catch(error => console.log(error));
