export class DataService {
    constructor(dataModeService: IDataService) {}
}
export interface IDataService {
    getOneById(id: number): Promise<Todo>;
    getAll(): Promise<Todo[]>;
    create(todo: Todo): Promise<Todo>;
    update(todo: Todo): Promise<Todo>;
    delete(id: number): Promise<void>;
}
export type Todo = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};
export enum DataMode {
    local = "data.local.ts",
    api = "data.api.ts",
    apilogin = "data.apilogin.ts",
}
