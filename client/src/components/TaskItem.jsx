import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);

    const handleToggleComplete = () => {
        onUpdate(task.id, { completed: !task.completed });
    };

    const handleSave = () => {
        onUpdate(task.id, { title: editTitle, description: editDescription });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDescription(task.description);
        setIsEditing(false);
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <div className="task-edit-form">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="edit-input"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="edit-textarea"
                    />
                    <div className="task-actions">
                        <button onClick={handleSave} className="btn btn-success">Save</button>
                        <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="task-content">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                    <div className="task-actions">
                        <button onClick={handleToggleComplete} className={`btn ${task.completed ? 'btn-warning' : 'btn-success'}`}>
                            {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
                        </button>
                        <button onClick={() => setIsEditing(true)} className="btn btn-info">Edit</button>
                        <button onClick={() => onDelete(task.id)} className="btn btn-danger">Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;
