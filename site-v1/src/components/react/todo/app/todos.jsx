import { useEffect, useState } from "react";
import TodoList from "./components/todolist";
import TodoEdit from "./components/todoedit";
import { DataService } from "./services/data";

const Todos = ({ info, modus }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [dataService, _] = useState(new DataService(modus));
    const [save, setSave] = useState(true);
    async function getData() {
        console.log("getData");
        if (dataService == null) return;
        const data = await dataService.getAll();
        setTodos(data);
    }
    useEffect(() => {
        getData();
    }, []);
    //wenn selectedTodo sich ändert, dann speichern aber erst nach 3 sec
    // useEffect(() => {
    //     if (selectedTodo != null && !save) {
    //         const timeout = setTimeout(() => {
    //             dataService.update(selectedTodo);
    //             setSave(true);
    //         }, 1000);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [selectedTodo]);

    // wenn save auf false gesetzt wird, soll der Speichervorgang ausgeführt werden
    useEffect(() => {
        if (!save && selectedTodo != null) {
            const timeout = setTimeout(() => {
                dataService.update(selectedTodo);
                setSave(true);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [save]);

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
                {selectedTodo != null && (
                    <TodoEdit selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} dataService={dataService} save={save} setSave={setSave} />
                )}
            </div>
        </>
    );
};
export default Todos;
