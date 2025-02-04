import { useEffect, useState } from "react";

const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos/";
// const API_URL = "http://localhost:8000/api/todos/";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data)
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
        
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTodo })
            });
            setNewTodo("");
            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`${API_URL}${id}/`, { method: "DELETE" });
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Todo List</h2>
            <div className="flex gap-2 mb-4">
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New todo..."
                    className="border p-2 w-full"
                />
                <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            </div>
            {todos.map((todo) => (
                <div key={todo.id} className="mb-2 flex justify-between items-center p-2 border rounded">
                    <span>{todo.title}</span>
                    <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>
            ))}
        </div>
    );
}
