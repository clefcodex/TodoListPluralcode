import { useEffect, useState } from "react";
import axios from 'axios'

const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos/";
// const API_URL = "http://localhost:8000/api/todos/";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [refresh, setRefresh] = useState(0)
    const [title, setTitle] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        completed: false,
        deadline: "No dealine",
    });

    // const { title, completed, deadline } = formData;

    const handleChange = (e) => {
        e.preventDefault();
        setTitle( e.target.value );
    };

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setTodos(res.data)
            })
            .catch(err => console.log(err))
    }, [refresh]);

    // const addTodo = async () => {
    //     if (!newTodo.trim()) return;
    //     try {
    //         await fetch(API_URL, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ title: newTodo })
    //         });
    //         setNewTodo("");
    //         fetchTodos();
    //     } catch (error) {
    //         console.error("Error adding todo:", error);
    //     }
    // };


    const addTodo = (e) => {
        e.preventDefault();
        if (title) {
            setFormData({...formData, title })
            axios.post(API_URL, formData)
                .then(res => {
                    setTodos([...todos, res.data]);
                    setTitle("");

                })
                .catch(err => console.log(err))
        }
    };



    const deleteTodo = async (id) => {
        console.log(id)

        axios.delete(`${API_URL}/${id}`)
        .then(res => {
           console.log('DELETD RECORD::::', res)

        })
        .catch(err => console.log(err))
    
    };

    return (
        <div className="container">
        
            <div className="p-6 max-w-md mx-auto">
                
                <div className="flex gap-2 mb-4">
                    <form>
                        <input
                            type="text"
                            value={title}
                            onChange={handleChange}
                            placeholder="New todo..."
                            className="border p-2 w-full"
                        />
                        <input
                            type="submit"  
                            value='Add'
                            onClick={addTodo} 
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        />
                    </form>
                </div>
                                        
                <h2 className="text-xl font-bold mb-4">Todo List</h2>
                {todos.map((todo) => (
                    <div key={todo._id} className="mb-2 flex justify-between items-center p-2 border rounded">
                        <span>{todo.title}</span>
                        <button 
                            onClick={() => deleteTodo(todo._id)} 
                            className="bg-red-500 text-white px-2 py-1 rounded">
                            Delete
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={() => {handleUpdate()}}>
                            Update
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}



