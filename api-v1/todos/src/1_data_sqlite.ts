import { ITodoData, Todo, Todos } from "./1_data";
import { Database } from "sqlite3";

export class TodosDataSqlite implements ITodoData {
    db = new Database("./data/todos.db");
    constructor() {
        console.log("Using SQLite data provider");
    }
    async getAll(userid: string): Promise<Todos> {
        return new Promise((resolve, reject) => {
            this.db.all<Todo>("SELECT * FROM todos WHERE userid = ?", [userid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    async getOneById(userid: string, id: string): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.get<Todo>("SELECT * FROM todos WHERE id = ? AND userid = ?", [id, userid], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }
    async create(userid: string, todo: Todo): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO todos (id, title, description, done, userid) VALUES (?, ?, ?, ?, ?)",
                [todo.id, todo.title, todo.description, todo.done, userid],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(todo);
                }
            );
        });
    }
    async update(userid: string, id: string, todo: Todo): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.run(
                "UPDATE todos SET title = ?, description = ?, done = ? WHERE id = ? AND userid = ?",
                [todo.title, todo.description, todo.done, id, userid],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(todo);
                }
            );
        });
    }
    async delete(userid: string, id: string): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.run("DELETE FROM todos WHERE id = ? AND userid = ?", [id, userid], (err) => {
                if (err) {
                    reject(err);
                }
                resolve({});
            });
        });
    }
}
