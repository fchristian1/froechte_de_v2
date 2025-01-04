import { Router } from "express";
import { TodosController } from "./2_controller";

const rodoRouter = (controller: TodosController) => {
    const router = Router();

    router.get("/", controller.getTodos);
    router.get("/:id", controller.getTodo);
    router.post("/", controller.addTodo);
    router.put("/:id", controller.updateTodo);
    router.delete("/:id", controller.deleteTodo);

    return router;
};

export default rodoRouter;
