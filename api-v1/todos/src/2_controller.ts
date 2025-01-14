import { Request, Response } from "express";
import { ITodoData } from "./1_data";
import { getUserIdByToken } from "./common";

export class TodosController {
    data: ITodoData;
    constructor(data: ITodoData) {
        this.data = data;
    }
    getTodos = async (req: Request, res: Response) => {
        let userid = "";
        if (req.baseUrl.includes("1/todos") && req.body.userid) {
            userid = req.body.userid;
        } else {
            userid = getUserIdByToken(req.headers.authorization?.split(" ")[1] ?? "");
        }
        res.json(await this.data.getAll(userid));
    };
    getTodo = async (req: Request, res: Response) => {
        let userid = "";
        if (req.baseUrl.includes("1/todos") && req.body.userid) {
            userid = req.body.userid;
        } else {
            userid = getUserIdByToken(req.headers.authorization?.split(" ")[1] ?? "");
        }
        res.json(await this.data.getOneById(userid, req.params.id));
    };
    addTodo = async (req: Request, res: Response) => {
        let userid: string;
        if (req.baseUrl.includes("1/todos") && req.body.userid) {
            userid = req.body.userid;
        } else {
            userid = getUserIdByToken(req.headers.authorization?.split(" ")[1] ?? "");
        }
        res.json(await this.data.create(userid, req.body));
    };
    updateTodo = async (req: Request, res: Response) => {
        let userid = "";
        if (req.baseUrl.includes("1/todos") && req.body.userid) {
            userid = req.body.userid;
        } else {
            userid = getUserIdByToken(req.headers.authorization?.split(" ")[1] ?? "");
        }
        res.json(await this.data.update(userid, req.params.id, req.body));
    };
    deleteTodo = async (req: Request, res: Response) => {
        let userid = "";
        if (req.baseUrl.includes("1/todos") && req.body.userid) {
            userid = req.body.userid;
        } else {
            userid = getUserIdByToken(req.headers.authorization?.split(" ")[1] ?? "");
        }
        res.json(await this.data.delete(userid, req.params.id));
    };
}
