const { tasks } = require('../data/store');
const { v4: uuidv4 } = require('uuid'); // We'll need to install uuid or use a simple random id

// Simple ID generator if uuid is not installed, but better to use uuid.
// For simplicity without extra deps, I'll use Date.now().toString()
const generateId = () => Date.now().toString();

const getTasks = (req, res) => {
    res.json(tasks);
};

const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = {
        id: generateId(),
        title,
        description: description || '',
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const { title, description, completed } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);

    if (taskIndex > -1) {
        const updatedTask = { ...tasks[taskIndex] };
        if (title !== undefined) updatedTask.title = title;
        if (description !== undefined) updatedTask.description = description;
        if (completed !== undefined) updatedTask.completed = completed;

        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
