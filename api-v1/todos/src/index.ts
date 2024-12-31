import express from "express";
import cors from "cors";
import { TodosDataSqlite } from "./1_data_sqlite";
import { TodosData } from "./1_data";
import todoRouter from "./3_router";
import { TodosController } from "./2_controller";

const dataProvider = new TodosDataSqlite();
const dataTodos = new TodosData(dataProvider);
const controller = new TodosController(dataTodos);
const router = todoRouter(controller);
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
