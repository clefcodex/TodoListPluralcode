import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Google1() {
  const API_URL = "https://todolist-pluralcode-backend.onrender.com/api/todos";
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ title: "" });
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addData() {
    axios
      .post(API_URL, newData)
      .then((response) => {
        setData([...data, response.data]);
        setNewData({ title: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateData() {
    axios
      .put(`https://api.example.com/data/${selectedData.id}`, selectedData)
      .then((response) => {
        const newData = data.map((item) => {
          if (item.id === selectedData.id) {
            return response.data;
          }
          return item;
        });
        setData(newData);
        setSelectedData(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteData(id) {
    axios
      .delete(`https://api.example.com/data/${id}`)
      .then(() => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleInputChange(event) {
    setNewData({ ...newData, title: event.target.value });
  }

  function handleEdit(item) {
    setSelectedData(item);
  }

  function handleCancel() {
    setSelectedData(null);
  }

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.title}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => deleteData(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedData && (
        <div>
          <h2>Edit Data</h2>
          <form onSubmit={updateData}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedData.name}
                onChange={(event) =>
                  setSelectedData({ ...selectedData, name: event.target.value })
                }
              />
            </label>
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
      <div>
        <h2>Add Data</h2>
        <form onSubmit={addData}>
          <label>
            Name:
            <input
              type="text"
              value={newData.title}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Add Data</button>
        </form>
      </div>
    </div>
  );
}
