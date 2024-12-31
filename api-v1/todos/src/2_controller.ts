import { Request, Response } from "express";
import { ITodoData } from "./1_data";

export class TodosController {
    data: ITodoData;
    constructor(data: ITodoData) {
        this.data = data;
    }
    getTodos = (req: Request, res: Response) => {
        res.json(this.data.getAll());
    };
    getTodo = (req: Request, res: Response) => {
        res.json(this.data.getOneById(req.params.id));
    };
    addTodo = (req: Request, res: Response) => {
        res.json(this.data.create(req.body));
    };
    updateTodo = (req: Request, res: Response) => {
        res.json(this.data.update(req.params.id, req.body));
    };
    deleteTodo = (req: Request, res: Response) => {
        res.json(this.data.delete(req.params.id));
    };
}
