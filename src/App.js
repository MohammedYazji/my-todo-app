import { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1748508945617,
      name: "Please Enter a new Task Above😊...",
      status: "active",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [statusBtn, setStatusBtn] = useState("all");

  function handleAdd(e) {
    e.preventDefault();
    if (newTask === "") return;
    setTasks((t) => [
      ...t,
      { id: Date.now(), name: newTask, status: "active" },
    ]);
    setNewTask("");
    console.log(tasks);
  }

  function handleStatus(id) {
    setTasks((t) =>
      t.map((task) =>
        id === task.id
          ? {
              ...task,
              status: task.status === "active" ? "completed" : "active",
            }
          : task
      )
    );
  }

  function handleDelete(id) {
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <h2>🖋️ My Todo App</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-btn btn">Add</button>
      </form>
      <div className="filters">
        <button className="btn btn-status" onClick={() => setStatusBtn("all")}>
          All
        </button>
        <button
          className="btn btn-status"
          onClick={() => setStatusBtn("active")}
        >
          Active
        </button>
        <button
          className="btn btn-status"
          onClick={() => setStatusBtn("completed")}
        >
          Completed
        </button>
      </div>
      <div className="item-list">
        {tasks.map((task, i) => {
          if (statusBtn === "all")
            return (
              <Item
                task={task.name}
                id={task.id}
                key={i}
                status={task.status}
                handleStatus={handleStatus}
                handleDelete={handleDelete}
              />
            );
          if (statusBtn === task.status)
            return (
              <Item
                task={task.name}
                id={task.id}
                key={i}
                status={task.status}
                handleStatus={handleStatus}
                handleDelete={handleDelete}
              />
            );
          return null;
        })}
      </div>
    </div>
  );
}

function Item({ task, status, id, handleStatus, handleDelete }) {
  return (
    <div className="item">
      <div>
        {" "}
        <input
          type="checkbox"
          checked={status === "completed" ? true : false}
          onChange={() => handleStatus(id)}
        />
        <span className={status === "completed" ? "completed" : ""}>
          {task}
        </span>
      </div>
      <div className="delete-item">
        <button onClick={() => handleDelete(id)}>❌</button>
      </div>
    </div>
  );
}

export default App;
