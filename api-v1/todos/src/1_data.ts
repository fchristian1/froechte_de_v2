export class TodosData implements ITodoData {
    dataProvider: ITodoData;
    constructor(dataProvider: ITodoData) {
        this.dataProvider = dataProvider;
    }

    async getAll(): Promise<Todos> {
        return this.dataProvider.getAll();
    }
    async getOneById(id: string): Promise<Todo | {}> {
        return this.dataProvider.getOneById(id);
    }
    async create(todo: Todo): Promise<Todo | {}> {
        todo.id = crypto.randomUUID();
        return this.dataProvider.create(todo);
    }
    async update(id: string, todo: Todo): Promise<Todo | {}> {
        return this.dataProvider.update(id, todo);
    }
    async delete(id: string): Promise<Todo | {}> {
        return this.dataProvider.delete(id);
    }
}

export interface ITodoData {
    getAll(): Promise<Todos>;
    getOneById(id: string): Promise<Todo | {}>;
    create(todo: Todo): Promise<Todo | {}>;
    update(id: string, todo: Todo): Promise<Todo | {}>;
    delete(id: string): Promise<Todo | {}>;
}

export type Todos = Todo[];

export type Todo = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};
