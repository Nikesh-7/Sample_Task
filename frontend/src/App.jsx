import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    try {
      setError("");
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Could not load tasks.");
      setTasks(await response.json());
    } catch (err) {
      setError("Cannot connect to the backend. Check that Spring Boot and PostgreSQL are running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), completed: false })
      });
      if (!response.ok) throw new Error("Could not create task.");
      setTitle("");
      setDescription("");
      await loadTasks();
    } catch {
      setError("Task could not be added. Please try again.");
    }
  }

  async function toggleTask(task) {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed })
      });
      if (!response.ok) throw new Error();
      await loadTasks();
    } catch {
      setError("Could not update task.");
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      await loadTasks();
    } catch {
      setError("Could not delete task.");
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="page">
      <section className="app-card">
        <header>
          <p className="eyebrow">STAY ORGANIZED</p>
          <h1>My Task Manager</h1>
          <p className="subtitle">A simple place to keep track of what matters.</p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What do you need to do?"
            aria-label="Task title"
            required
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description (optional)"
            aria-label="Task description"
          />
          <button type="submit">Add task</button>
        </form>

        <div className="task-summary">
          <span>{tasks.length} tasks</span>
          <span>{completedCount} completed</span>
        </div>

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p className="empty">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task above.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <label className={task.completed ? "task-text completed" : "task-text"}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                  />
                  <span>
                    <strong>{task.title}</strong>
                    {task.description && <small>{task.description}</small>}
                  </span>
                </label>
                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer>Built with React · Spring Boot · PostgreSQL</footer>
    </main>
  );
}

export default App;
