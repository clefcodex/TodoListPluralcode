import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {

//   const navigate = useNavigate()
//   // return isAuthenticated() ? children : <Navigate to="/login" />;
//   return isAuthenticated() ? children : navigate("/login");
// };

export default function ProtectedRoute() {
  const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos";
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
    if(todo.completed) {
      alert(todo.title)
      // todo.title.addClass('completed')
    }
    await axios.patch(`${API_URL}/${todo._id}`, { ...todo, completed: !todo.completed });
    
    fetchTodos();
  };

  return (
    <>
      <div className="container">
        <h2 className="font-bold mt-4">Schedule Task</h2> <br />
          <div className="container">
            <div className="row justify-content-md-start">
              <div className="col-10 col-md-8 col-lg-6">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <input 
                        type="text" 
                        placeholder="Task Title"
                        className="form-control" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deadline">Deadline</label>
                    <input 
                      type="date" 
                      placeholder="Today"
                      className="form-control" 
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 mt-2">{editingId ? "Update" : "Add"} Task</button>
                </form>
              </div>
            </div>
          </div>
        <h2 className="mt-4">Task Lists</h2>
        <table className="table">
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
                    <button className="btn btn-secondary" onClick={() => handleEdit(todo)}>Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </>
  );
}



