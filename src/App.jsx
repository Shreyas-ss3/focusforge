import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [time, setTime] = useState(1500);
  const [active, setActive] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let timer;
    if (active && time > 0) {
      timer = setInterval(() => setTime(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [active, time]);

  const login = () => {
    if (!email.trim()) return;
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
    setIsPremium(false);
  };

  const subscribe = () => {
    alert("Stripe will be added later");
  };

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!user) {
    return (
      <div>
        <h1>FocusForge Pro</h1>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.email}</h1>

      <h2>Tasks</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {tasks.map((t, i) => (
        <div key={i} onClick={() => toggleTask(i)}>
          {t.text}
        </div>
      ))}

      <h2>{formatTime(time)}</h2>
      <button onClick={() => setActive(true)}>Start</button>
      <button onClick={() => setActive(false)}>Pause</button>
      <button onClick={() => setTime(1500)}>Reset</button>
    </div>
  );
}