function TodoEdit({ selectedTodo, setSelectedTodo, save, setSave }) {
    return (
        <div className="w-1/2 border border-gray-500 rounded p-1 flex gap-1 flex-col">
            <div>
                <input
                    className="border rounded px-1 w-full"
                    onChange={(e) => {
                        setSelectedTodo({ ...selectedTodo, title: e.target.value });
                        setSave(false);
                    }}
                    value={selectedTodo.title}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="title"
                />
            </div>
            <div>
                <textarea
                    className="border rounded px-1 w-full min-h-24"
                    onChange={(e) => {
                        setSelectedTodo({ ...selectedTodo, description: e.target.value });
                        setSave(false);
                    }}
                    value={selectedTodo.description}
                    name="description"
                    id="description"
                    placeholder="description"
                ></textarea>
                <div className="flex flex-row gap-1">
                    <input
                        className="w-[24px] h-[24px]"
                        type="checkbox"
                        checked={selectedTodo.done}
                        onChange={(e) => {
                            setSelectedTodo({ ...selectedTodo, done: e.target.checked });
                            setSave(false);
                        }}
                    />{" "}
                    done?
                </div>
            </div>
            <div className="flex flex-row gap-1">
                <p className={save && " text-green-500 "}>{save ? "save!" : "saved?"}</p>
            </div>
        </div>
    );
}

export default TodoEdit;
