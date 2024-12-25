import React from "react";

function Todo({ todo, selectedTodo, setSelectedTodo, todos, setTodos, index }) {
    return (
        <li
            onClick={() => {
                selectedTodo ? setSelectedTodo(null) : setSelectedTodo(todo);
            }}
            key={todo.id}
            className={" cursor-pointer border border-gray-500 rounded p-1 " + (selectedTodo && selectedTodo.id === todo.id ? " bg-gray-400 " : " ")}
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
    );
}

export default Todo;
