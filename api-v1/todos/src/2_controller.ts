import { Request, Response } from "express";
import { ITodoData } from "./1_data";

export class TodosController {
    data: ITodoData;
    constructor(data: ITodoData) {
        this.data = data;
    }
    getTodos = async (req: Request, res: Response) => {
        res.json(await this.data.getAll());
    };
    getTodo = async (req: Request, res: Response) => {
        res.json(this.data.getOneById(req.params.id));
    };
    addTodo = async (req: Request, res: Response) => {
        res.json(this.data.create(req.body));
    };
    updateTodo = async (req: Request, res: Response) => {
        res.json(this.data.update(req.params.id, req.body));
    };
    deleteTodo = async (req: Request, res: Response) => {
        res.json(this.data.delete(req.params.id));
    };
}
