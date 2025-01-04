import { ITodoData, Todo, Todos } from "./1_data";
import { Database } from "sqlite3";

export class TodosDataSqlite implements ITodoData {
    db = new Database("./data/todos.db");
    constructor() {
        console.log("Using SQLite data provider");
    }
    async getAll(): Promise<Todos> {
        return new Promise((resolve, reject) => {
            this.db.all<Todo>("SELECT * FROM todos", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    async getOneById(id: string): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.get<Todo>("SELECT * FROM todos WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }
    async create(todo: Todo): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO todos (id, title, description, done) VALUES (?, ?, ?, ?)", [todo.id, todo.title, todo.description, todo.done], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(todo);
            });
        });
    }
    async update(id: string, todo: Todo): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.run("UPDATE todos SET title = ?, description = ?, done = ? WHERE id = ?", [todo.title, todo.description, todo.done, id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(todo);
            });
        });
    }
    async delete(id: string): Promise<Todo | {}> {
        return new Promise((resolve, reject) => {
            this.db.run("DELETE FROM todos WHERE id = ?", [id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve({});
            });
        });
    }
}
