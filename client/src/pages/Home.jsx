import React, { useState, useEffect } from 'react';
import api from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [navigate]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch tasks');
            setLoading(false);
        }
    };

    const addTask = async (newTask) => {
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const updateTask = async (id, updatedFields) => {
        try {
            const response = await api.put(`/tasks/${id}`, updatedFields);
            setTasks(tasks.map(task => task.id === id ? response.data : task));
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="home-container">
            <header className="app-header">
                <h1>Task Manager</h1>
                <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </header>
            <main>
                <section className="add-task-section">
                    <h2>Add New Task</h2>
                    <TaskForm onAdd={addTask} />
                </section>
                <section className="task-list-section">
                    <h2>Your Tasks</h2>
                    <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
                </section>
            </main>
        </div>
    );
};

export default Home;
