import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos/";

export default function GptAxios() {
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
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;

    if (editingId) {
      await axios.put(url, todo);
    } else {
      await axios.post(url, todo);
    }
    
    setTitle("");
    setDeadline("");
    setEditingId(null);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDeadline(todo.deadline || "");
    setEditingId(todo.id);
  };

  const toggleCompletion = async (todo) => {
    await axios.put(`${API_URL}${todo.id}/`, { ...todo, completed: !todo.completed });
    fetchTodos();
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <Button type="submit">{editingId ? "Update" : "Add"} Task</Button>
      </form>
      <div className="mt-6 space-y-2">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleCompletion(todo)}
              />
              <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
              {todo.deadline && <span className="text-red-500 text-sm">({todo.deadline})</span>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleEdit(todo)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(todo.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
