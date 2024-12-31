import { localApiService } from "./data.local";
import { apiDataService } from "./data.api";
import { apiLoginDataService } from "./data.apilogin";

export class DataService implements IDataService {
    dataServiceFromMode: IDataService;
    constructor(dataMode: DataMode) {
        const dataServiceMap = {
            [DataMode.local]: localApiService,
            [DataMode.api]: apiDataService,
            [DataMode.apilogin]: apiLoginDataService,
        };

        const DataServiceClass = dataServiceMap[dataMode];
        if (!DataServiceClass) {
            throw new Error("Invalid data mode");
        }

        this.dataServiceFromMode = new DataServiceClass();
    }
    getOneById(id: string): Promise<Todo | {}> {
        return this.dataServiceFromMode.getOneById(id);
    }
    getAll(): Promise<Todo[]> {
        return this.dataServiceFromMode.getAll();
    }
    create(todo: Todo): Promise<Todo | {}> {
        return this.dataServiceFromMode.create(todo);
    }
    update(todo: Todo): Promise<Todo | {}> {
        return this.dataServiceFromMode.update(todo);
    }
    delete(id: string): Promise<void | {}> {
        return this.dataServiceFromMode.delete(id);
    }
}
export interface IDataService {
    getOneById(id: string): Promise<Todo | {}>;
    getAll(): Promise<Todo[]>;
    create(todo: Todo): Promise<Todo | {}>;
    update(todo: Todo): Promise<Todo | {}>;
    delete(id: string): Promise<void | {}>;
}
export type Todo = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};
export enum DataMode {
    local = "local",
    api = "api",
    apilogin = "apilogin",
}
