import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { title, deadline: deadline || null, completed: false };
    
    if (editingId) {
      await axios.delete(`${API_URL}/${editingId}`);
      await axios.post(API_URL, todo);
    } else {
      await axios.post(API_URL, todo);
    }
    
    setTitle("");
    setDeadline("");
    setEditingId(null);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDeadline(todo.deadline || "");
    setEditingId(todo._id);
  };

  const toggleCompletion = async (todo) => {
    await axios.patch(`${API_URL}/${todo._id}`, { ...todo, completed: !todo.completed });
    fetchTodos();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">{editingId ? "Update" : "Add"} Task</button>
      </form>
      <h2>Task Lists</h2>
      <table class="table">
        <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Deadline</th>
              <th scope="col">Completed</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>           
            {todos.map((todo) => (
              <tr key={todo._id}>
                <td className={todo.completed ? "line-through" : ""}>{todo.title}</td>
                <td className="text-red-500 text-sm">{todo.deadline ? todo.deadline : "No Deadline"}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo)}
                  />
                </td>
                
                <td>
                  <button className="" onClick={() => handleEdit(todo)}>Edit</button>
                </td>
                <td>
                  <button className="" onClick={() => handleDelete(todo._id)}>Delete</button>
                </td>
                
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}
