import { ITodoData, Todo, Todos } from "./1_data";

export class TodosDataSqlite implements ITodoData {
    todos: Todos = [];
    getAll(): Todos {
        throw new Error("Method not implemented.");
    }
    getOneById(id: string): Todo | {} {
        throw new Error("Method not implemented.");
    }
    create(todo: Todo): Todo | {} {
        throw new Error("Method not implemented.");
    }
    update(id: string, todo: Todo): Todo | {} {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Todo | {} {
        throw new Error("Method not implemented.");
    }
}
