import { useState, useEffect } from "react";
import axios from "axios";



export default function Gpt1() {

    const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos/";
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

    await axios.post(API_URL, todo);
    
    // if (editingId) {
    //     await axios.delete(`${API_URL}/${editingId}`);
    //     await handleDelete(editingId);
    //     await axios.post(API_URL, todo);
    // } else {
    //   await axios.post(API_URL, todo);
    // }

    setTitle("");
    setDeadline("");
    setEditingId(null);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const handleEdit = async(todo) => {

    axios.put(`${API_URL}/${todo._id}`, todo)
        .then(response => {
        const newData = data.map(item => {
            if (item.id === selectedData.id) {
            return response.data;
            }
            return item;
        });
        setData(newData);
        setSelectedData(null);
        })
        .catch(error => {
        console.log(error);
        })
      
    









        // await axios.delete(`${API_URL}/${editingId}`);
        // await handleDelete(editingId);
        await axios.put(API_URL, todo);

        setTitle(todo.title);
        setDeadline(todo.deadline || "");
        setEditingId(todo.id);
  };

  const toggleCompletion = async (todo) => {
    await axios.put(`${API_URL}/${todo.id}`, { ...todo, completed: !todo.completed });
    fetchTodos();
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
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
      <div className="mt-6 space-y-2">
        {todos.map((todo) => (
          <div key={todo._id} className="p-2 border rounded flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo)}
              />
              <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
              {todo.deadline && <span className="text-red-500 text-sm">({todo.deadline})</span>}
            </div>
            <div className="flex gap-2">
              <button className="p-1 bg-yellow-500 text-white rounded" onClick={() => handleEdit(todo)}>Edit</button>
              <button className="p-1 bg-red-500 text-white rounded" onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
