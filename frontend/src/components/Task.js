import React from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";

const Task = ({ task, index, deleteTask, getSingleTask }) => {
  return (
    <div className="task">
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <p>{task.dueDate}</p>
      <div className="task-icons">
        <TbEdit color="blue" onClick={() => getSingleTask(task)} />
        <MdDeleteForever color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
