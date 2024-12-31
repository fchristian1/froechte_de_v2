export class TodosData implements ITodoData {
    dataProvider: ITodoData;
    constructor(dataProvider: ITodoData) {
        this.dataProvider = dataProvider;
    }

    getAll(): Todos {
        return this.dataProvider.getAll();
    }
    getOneById(id: string): Todo | {} {
        return this.dataProvider.getOneById(id);
    }
    create(todo: Todo): Todo | {} {
        return this.dataProvider.create(todo);
    }
    update(id: string, todo: Todo): Todo | {} {
        return this.dataProvider.update(id, todo);
    }
    delete(id: string): Todo | {} {
        return this.dataProvider.delete(id);
    }
}

export interface ITodoData {
    getAll(): Todos;
    getOneById(id: string): Todo | {};
    create(todo: Todo): Todo | {};
    update(id: string, todo: Todo): Todo | {};
    delete(id: string): Todo | {};
}

export type Todos = Todo[];

export type Todo = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};
