import { useState } from "react";

function TodoList({ todos, setTodos, selectedTodo, setSelectedTodo }) {
    const [newTodo, setNewTodo] = useState({ id: crypto.randomUUID(), title: "", done: false, date: Date.now().toString() });
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
                    onClick={() => {
                        if (newTodo.title === "") return;
                        setTodos([...todos, newTodo]);
                        setNewTodo({ id: crypto.randomUUID(), title: "", done: false, date: Date.now().toString() });
                    }}
                    className="px-2 border border-gray-500 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Add
                </button>
            </div>
            <div>
                <ul className="pt-1 flex flex-col gap-1">
                    {todos.map((todo, index) => (
                        <li
                            onClick={() => {
                                selectedTodo ? setSelectedTodo(null) : setSelectedTodo(todo);
                            }}
                            key={todo.id}
                            className={
                                " cursor-pointer border border-gray-500 rounded p-1 " + (selectedTodo && selectedTodo.id === todo.id ? " bg-gray-400 " : " ")
                            }
                        >
                            <input
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                onChange={(e) => {
                                    const newTodos = [...todos];
                                    newTodos[index].done = e.target.checked;
                                    setTodos(newTodos);
                                }}
                                checked={todo.done}
                                className="me-1"
                                type="checkbox"
                            />
                            <span className="">{todo.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
