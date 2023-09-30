import { DataSource } from "typeorm";
import "dotenv/config";

const source = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities:
        process.env.NODE_ENV === "prd"
            ? ["dist/modules/**/infra/typeorm/entities/*.js"]
            : ["src/modules/**/infra/typeorm/entities/*.ts"],
    migrations:
        process.env.NODE_ENV === "prd"
            ? ["./dist/shared/infra/typeorm/migrations/*.js"]
            : ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export default source;