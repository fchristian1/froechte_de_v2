import type { IDataService, Todo } from "./data";
const API_URL = "http://localhost:3000/todos";

export class apiDataService implements IDataService {
    API_URL = 
    async getOneById(id: number): Promise<Todo> {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    }
    async getAll(): Promise<Todo[]> {
        const response = await fetch(API_URL);
        return await response.json();
    }
    async create(todo: Todo): Promise<Todo> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
            },
            body: JSON.stringify(todo),
        });
        return await response.json();
    }
    async delete(id: number): Promise<void> {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
    }
}
