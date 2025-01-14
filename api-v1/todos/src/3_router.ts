import { Router } from "express";
import { TodosController } from "./2_controller";
import { login } from "./common";

export const todoRouter = (controller: TodosController) => {
    const router = Router();

    router.get("/", controller.getTodos);
    router.get("/:id", controller.getTodo);
    router.post("/", controller.addTodo);
    router.put("/:id", controller.updateTodo);
    router.delete("/:id", controller.deleteTodo);

    return router;
};

export const authRouter = () => {
    const router = Router();

    router.post("/login", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const token = login(username, password);
    });
};
