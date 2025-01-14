import type { IDataService, Todo } from "./data";
const API_URL = "http://localhost:3000/api/v1/todoapp/2/todos";

export class apiLoginDataService implements IDataService {
    token: string = "";
    constructor() {
        const token = this.getTokenFromLocalStorrage();
        this.token = token;
    }
    getTokenFromLocalStorrage(): string {
        return localStorage.getItem("tokenlogin") ?? "";
    }
    setTokenFromLocalStorrage(): void {
        this.token = this.getTokenFromLocalStorrage();
    }
    async fetchApi(url: string, method: string, body?: string): Promise<Response> {
        this.setTokenFromLocalStorrage();
        console.log("token:", this.token);
        return await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: body,
        });
    }
    async getOneById(id: string): Promise<Todo | {}> {
        this.setTokenFromLocalStorrage();
        const response = await this.fetchApi(`${API_URL}/${id}`, "GET");
        return await response.json();
    }
    async getAll(): Promise<Todo[]> {
        this.setTokenFromLocalStorrage();
        const response = await this.fetchApi(API_URL, "GET");
        return await response.json();
    }
    async create(todo: Todo): Promise<Todo | {}> {
        this.setTokenFromLocalStorrage();
        const response = await this.fetchApi(API_URL, "POST", JSON.stringify(todo));
        return await response.json();
    }
    async update(todo: Todo): Promise<Todo | {}> {
        this.setTokenFromLocalStorrage();
        const response = await this.fetchApi(`${API_URL}/${todo.id}`, "PUT", JSON.stringify(todo));
        return await response.json();
    }
    async delete(id: string): Promise<void | {}> {
        this.setTokenFromLocalStorrage();
        await this.fetchApi(`${API_URL}/${id}`, "DELETE");
    }
}
