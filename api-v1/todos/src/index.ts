import express from "express";
import cors from "cors";
import { TodosDataSqlite } from "./1_data_sqlite";
import { TodosData } from "./1_data";
import { authRouter, todoRouter } from "./3_router";
import { TodosController } from "./2_controller";
import { checkAndCreatePath, middleware1Auth, middleware2Auth } from "./common";

checkAndCreatePath("./data");

const dataProvider = new TodosDataSqlite();
const dataTodos = new TodosData(dataProvider);
const controller = new TodosController(dataTodos);
const todoRouterWithController = todoRouter(controller);
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/todoapp/1/todos", middleware1Auth, todoRouterWithController);
app.use("/api/v1/todoapp/2/todos", middleware2Auth, todoRouterWithController);
app.use("/api/v1/todoapp/", authRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
