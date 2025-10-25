const Task = require('../models/Task');


const getTasks = async (req, res) => {
try {
const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


const createTask = async (req, res) => {
try {
const { title, description } = req.body;
if (!title) return res.status(400).json({ message: 'Title is required' });


const task = await Task.create({ title, description, owner: req.user.id });
res.status(201).json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


const updateTask = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findOne({ _id: id, owner: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });


const updates = req.body;
Object.assign(task, updates);
await task.save();
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


const deleteTask = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


module.exports = { getTasks, createTask, updateTask, deleteTask };