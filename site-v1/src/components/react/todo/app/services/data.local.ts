import type { IDataService, Todo } from "./data";

export class localApiService implements IDataService {
    todos: Todo[];
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos") ?? "[]");
    }
    async getOneById(id: string): Promise<Todo | {}> {
        return this.todos.find((todo) => todo.id === id) ?? {};
    }
    async getAll(): Promise<Todo[]> {
        return this.todos;
    }
    async create(todo: Todo): Promise<Todo | {}> {
        let newId = crypto.randomUUID();
        todo.id = newId;
        let l = this.todos.length;
        this.todos.push(todo);
        if (l === this.todos.length) {
            return {};
        }
        localStorage.setItem("todos", JSON.stringify(this.todos));
        return todo;
    }
    async update(todo: Todo): Promise<Todo | {}> {
        this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem("todos", JSON.stringify(this.todos));

        return todo;
    }
    async delete(id: string): Promise<void> {
        let l = this.todos.length;
        this.todos = this.todos.filter((t) => t.id !== id);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}
