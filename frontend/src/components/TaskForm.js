import React from "react";

const TaskForm = ({
  createTask,
  name,
  description,
  dueDate,
  handleChange,
  isEditing,
  updateTask,
}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input
        type="text"
        placeholder="Task Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Task Description"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Due Date"
        name="dueDate"
        value={dueDate}
        onChange={handleChange}
      />
      <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
};

export default TaskForm;
