import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };
  const addTask = () => {
    if (newTask.trim() !== "") setTasks((tasks) => [...tasks, newTask]);
    setNewTask("");
  };
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };
  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };
  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };
  return (
    <div className=" flex flex-col justify-center mt-50">
      <h1>To-Do-List</h1>
      <div className=" flex flex-row justify-center m-3 mt-10">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          className="border rounded-md mx-5 p-3"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <hr />
      <ul className="">
        {tasks.map((task, index) => (
          <li className="items-center m-5" key={index}>
            {task}
            <button className="mx-1" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="mx-1" onClick={() => moveTaskUp(index)}>
              Move Up
            </button>
            <button className="mx-1" onClick={() => moveTaskDown(index)}>
              Move Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ToDoList;
