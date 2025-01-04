import type { IDataService, Todo } from "./data";
const API_URL = "http://localhost:3000/api/v1/2/todos";

export class apiLoginDataService implements IDataService {
    token: string;
    constructor() {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }
        this.token = token;
    }
    async getOneById(id: string): Promise<Todo | {}> {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        return await response.json();
    }
    async getAll(): Promise<Todo[]> {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        return await response.json();
    }
    async create(todo: Todo): Promise<Todo | {}> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(todo),
        });
        return await response.json();
    }
    async update(todo: Todo): Promise<Todo | {}> {
        const response = await fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(todo),
        });
        return await response.json();
    }
    async delete(id: string): Promise<void | {}> {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
    }
}
