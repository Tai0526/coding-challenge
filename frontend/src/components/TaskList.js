import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { toast } from "react-toastify";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    Completed: false,
  });

  const name = formData.name;
  const description = formData.description;
  const dueDate = formData.dueDate;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks");
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "" || description === "" || dueDate === "") {
      return toast.error("Input fields cannot be left empty");
    }
    try {
      await axios.post("http://localhost:5000/api/tasks", formData);
      toast.success("Task Added Successfully");
      setFormData({ ...formData, name: "", description: "", dueDate: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      Completed: false,
    });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "" || description === "" || dueDate === "") {
      return toast.error("Input fields cannot be left empty");
    }
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "", description: "", dueDate: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Lupiya Task Manager</h2>
      <TaskForm
        name={name}
        description={description}
        dueDate={dueDate}
        handleChange={handleChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks: </b> {tasks.length}
        </p>
      </div>
      <hr />
      {tasks.length === 0 ? (
        <p className="--py">No tasks available. Please add tasks</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
