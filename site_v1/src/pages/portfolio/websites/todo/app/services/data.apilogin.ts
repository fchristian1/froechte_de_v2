import type { IDataService, Todo } from "./data";
const API_URL = "http://localhost:3000/todos";

export class apiLoginDataService implements IDataService {
    constructor(private token: string) {
        this.token = token;
    }
    async getOneById(id: number): Promise<Todo> {
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
    async create(todo: Todo): Promise<Todo> {
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
    async update(todo: Todo): Promise<Todo> {
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
    async delete(id: number): Promise<void> {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
    }
}