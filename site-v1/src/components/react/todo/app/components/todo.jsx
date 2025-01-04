import React, { useEffect } from "react";

function Todo({ todo, selectedTodo, setSelectedTodo, todos, setTodos, index, dataService }) {
    useEffect(() => {
        if (selectedTodo && selectedTodo.id == todo.id) {
            setTodos((prev) => {
                return prev.map((t) => {
                    if (t.id == todo.id) {
                        return { ...t, title: selectedTodo.title, description: selectedTodo.description, done: selectedTodo.done };
                    }
                    return t;
                });
            });
        }
    }, [selectedTodo]);
    return (
        <li
            key={todo.id}
            className={
                " cursor-pointer border border-gray-500 rounded p-1 flex " +
                (selectedTodo && selectedTodo.id === todo.id ? " bg-gray-500 " : " hover:bg-gray-400 ")
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
                    dataService.update(todo);
                }}
                checked={todo.done}
                className="me-1 w-[24px] h-[24px]"
                type="checkbox"
            />
            <span
                onClick={() => {
                    selectedTodo && selectedTodo.id == todo.id ? setSelectedTodo(null) : setSelectedTodo(todo);
                }}
                className={" w-full " + (todo.done ? "line-through" : "")}
                title={todo.description}
            >
                {todo.title}
            </span>
        </li>
    );
}

export default Todo;
