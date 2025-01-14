import { use, useEffect, useState } from "react";
import TodoList from "./components/todolist";
import TodoEdit from "./components/todoedit";
import { DataService } from "./services/data";

const Todos = ({ info, modus }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [deleteTodo, setDeleteTodo] = useState(null);
    const [dataService, _] = useState(new DataService(modus));
    const [save, setSave] = useState(true);

    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    async function getData() {
        console.log("getData");
        if (dataService == null) return;
        const data = await dataService.getAll();
        setTodos([]);
        setTodos(data);
    }

    useEffect(() => {
        let token;
        modus === "api" && (token = localStorage.getItem("tokensimple") ?? "");
        modus === "apilogin" && (token = localStorage.getItem("tokenlogin") ?? "");
        if (token && token != "") {
            setToken(token);
        }
        getData();
    }, []);
    useEffect(() => {
        if (!save && selectedTodo != null) {
            const timeout = setTimeout(() => {
                dataService.update(selectedTodo);
                setSave(true);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [save]);
    useEffect(() => {
        if (deleteTodo != null) {
            (async () => await dataService.delete(deleteTodo.id))().then(() => {
                getData();
                setDeleteTodo(null);
                setSelectedTodo(null);
            });
        }
    }, [deleteTodo]);
    useEffect(() => {
        if (modus === "local") {
            setLogin(true);
        }
    }, [modus]);
    useEffect(() => {
        if (token && token != "") {
            modus === "api" && localStorage.setItem("tokensimple", token);
            modus === "apilogin" && localStorage.setItem("tokenlogin", token);
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [token]);
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
            {modus === "api" && (
                <div className="flex flex-row gap-2 items-center">
                    <label>Token: </label>
                    <input
                        onChange={(e) => {
                            setToken(e.target.value);
                        }}
                        value={token ?? ""}
                        className="border rounded py-1 px-2"
                        type="text"
                    />
                    <button
                        className="btn btn-blue py-1 px-4"
                        onClick={() => {
                            setToken(token);
                            getData();
                        }}
                    >
                        Login
                    </button>
                </div>
            )}
            {modus === "apilogin" && (
                <div>
                    <div className="flex">
                        <label className="w-24">Username: </label>
                        <input className="border rounded px-1" type="text" />
                    </div>
                    <div className="flex">
                        <label className="w-24">Password: </label>
                        <input className="border rounded px-1" type="text" />
                    </div>
                    <div>
                        <button className="btn btn-blue">Login</button>
                    </div>
                </div>
            )}
            {login === true && (
                <div className="pt-1 flex flex-row gap-1">
                    <TodoList todos={todos} setTodos={setTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} dataService={dataService} />
                    {selectedTodo != null && (
                        <TodoEdit
                            selectedTodo={selectedTodo}
                            setSelectedTodo={setSelectedTodo}
                            dataService={dataService}
                            save={save}
                            setSave={setSave}
                            deleteTodo={deleteTodo}
                            setDeleteTodo={setDeleteTodo}
                        />
                    )}
                </div>
            )}
        </>
    );
};
export default Todos;
