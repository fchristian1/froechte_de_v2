import { useState } from "react";
import Todo from "./todo";

function TodoList({ todos, setTodos, selectedTodo, setSelectedTodo, dataService }) {
    const [newTodo, setNewTodo] = useState({ title: "", description: "", done: false });

    return (
        <div className="w-1/2 border border-gray-500 rounded p-1">
            <div className="flex flex-row gap-1">
                <input
                    className="border rounded px-1"
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    value={newTodo.title}
                    type="text"
                    name="newtodo"
                    id="newtodo"
                    placeholder="new title"
                />
                <button
                    onClick={async () => {
                        if (newTodo.title === "") return;
                        newTodo.id = crypto.randomUUID();
                        console.log(newTodo);
                        todos.push(newTodo);
                        setTodos(todos);
                        dataService.create(newTodo);
                        setNewTodo({ title: "", description: "", done: false, id: "" });
                    }}
                    className="px-2 border border-gray-500 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Add
                </button>
            </div>
            <div>
                <ul className="pt-1 flex flex-col gap-1">
                    {todos.map((todo, index) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            selectedTodo={selectedTodo}
                            setSelectedTodo={setSelectedTodo}
                            todos={todos}
                            setTodos={setTodos}
                            index={index}
                            dataService={dataService}
                        ></Todo>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
