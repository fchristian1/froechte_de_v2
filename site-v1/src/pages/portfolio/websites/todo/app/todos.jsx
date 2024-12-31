import { useEffect, useState } from "react";
import TodoList from "./components/todolist";
import TodoEdit from "./components/todoedit";
import { DataService } from "./services/data";

const Todos = ({ info, modus }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [dataService, setDataService] = useState(null);
    async function getData() {
        if (dataService == null) return;
        const data = await dataService.getAll();
        setTodos(data);
    }
    getData();
    useEffect(() => {
        setDataService(new DataService(modus));
        getData();
    }, [modus]);
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        selectedTodo && dataService.update(selectedTodo);
    }, [selectedTodo]);

    return (
        <>
            <h1 className="text-xl font-bold">TodoList</h1>
            <div className="flex flex-row gap-2">
                <button
                    onClick={() => {
                        setShowInfo((prev) => !prev);
                    }}
                    className={"border rounded px-2 " + (showInfo ? " bg-gray-500 text-white " : " bg-white text-gray-500 ")}
                >
                    Info!
                </button>
                {showInfo && <p>{info}</p>}
            </div>
            <div className="pt-1 flex flex-row gap-1">
                <TodoList todos={todos} setTodos={setTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} dataService={dataService} />
                {selectedTodo != null && <TodoEdit selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} dataService={dataService} />}
            </div>
        </>
    );
};
export default Todos;
