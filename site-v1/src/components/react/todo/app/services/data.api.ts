import type { IDataService, Todo } from "./data";
const API_URL = "http://localhost:3000/api/v1/todoapp/1/todos";

export class apiDataService implements IDataService {
    async getOneById(id: string): Promise<Todo | {}> {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    }
    async getAll(): Promise<Todo[]> {
        console.log("API_URL", API_URL);
        const response = await fetch(API_URL);
        return await response.json();
    }
    async create(todo: Todo): Promise<Todo | {}> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
            },
            body: JSON.stringify(todo),
        });
        return await response.json();
    }
    async delete(id: string): Promise<void | {}> {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
    }
}
