/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./update.css"



const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ item }) => {
    if (!item) return <p>Loading...</p>;
    if (item.length === 0) return <p>No items in API</p>;
    const [form, setForm] = useState({ name: item.name });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedItem = {id: item.id, name: form.name, status: item.status};
        fetch(`${API_URI}/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("Update successful:", data);
                alert("Item updated successfully!");
            })
            .catch((err) => {
                console.error("Error updating:", err);
                alert("Failed to update item.");
            });
        };

    return (
        <div>
            <div className="data">
                <h2>Item Data:</h2>
                <h3>Name:</h3> <span>{form.name}</span>
                <h3>Id:</h3> <span>{item.id}</span>
                <h3>Status:</h3> <span>{item.status}</span>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="name">Update Name:</label>
                <input type="text" id="name" name="name" placeholder={form.name} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;