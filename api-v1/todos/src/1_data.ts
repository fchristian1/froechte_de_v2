export class TodosData implements ITodoData {
    dataProvider: ITodoData;
    constructor(dataProvider: ITodoData) {
        this.dataProvider = dataProvider;
    }

    async getAll(userid: string): Promise<Todos> {
        return this.dataProvider.getAll(userid);
    }
    async getOneById(userid: string, id: string): Promise<Todo | {}> {
        return this.dataProvider.getOneById(userid, id);
    }
    async create(userid: string, todo: Todo): Promise<Todo | {}> {
        todo.id == "" ? (todo.id = crypto.randomUUID()) : null;
        return this.dataProvider.create(userid, todo);
    }
    async update(userid: string, id: string, todo: Todo): Promise<Todo | {}> {
        return this.dataProvider.update(userid, id, todo);
    }
    async delete(userid: string, id: string): Promise<Todo | {}> {
        return this.dataProvider.delete(userid, id);
    }
}

export interface ITodoData {
    getAll(userid: string): Promise<Todos>;
    getOneById(userid: string, id: string): Promise<Todo | {}>;
    create(userid: string, todo: Todo): Promise<Todo | {}>;
    update(userid: string, id: string, todo: Todo): Promise<Todo | {}>;
    delete(userid: string, id: string): Promise<Todo | {}>;
}

export type Todos = Todo[];

export type Todo = {
    id: string;
    userid: string;
    title: string;
    description: string;
    done: boolean;
};
