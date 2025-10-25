import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ selectedTask, onTaskSaved, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (selectedTask) {
        await axios.put(`http://localhost:5000/api/tasks/${selectedTask._id}`, { title, description }, config);
      } else {
        await axios.post("http://localhost:5000/api/tasks", { title, description }, config);
      }
      onTaskSaved();
      setTitle("");
      setDescription("");
      onCancel();
    } catch (err) {
      alert("Error saving task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-2 rounded-lg"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 mb-2 rounded-lg"
      ></textarea>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        {loading ? "Saving..." : selectedTask ? "Update" : "Add"}
      </button>
      {selectedTask && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-gray-300 py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
