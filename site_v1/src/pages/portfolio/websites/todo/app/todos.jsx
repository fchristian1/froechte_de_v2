import { useEffect, useState } from "react";
import TodoList from "./components/todolist";
import TodoEdit from "./components/todoedit";
import { DataMode, DataService } from "./services/data";

const Todos = ({ info, modus }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const dataService = new DataService(DataMode[modus]);
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
                <TodoList todos={todos} setTodos={setTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
                {selectedTodo != null && <TodoEdit selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
            </div>
        </>
    );
};
export default Todos;