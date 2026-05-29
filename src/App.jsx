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
      timer = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [active, time]);

  const login = () => {
    if (!email.trim()) return;
    setUser({ email });
  };

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleUpgrade = async () => {
    try {
      const response = await fetch(
        "http://localhost:4242/create-checkout-session",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Stripe checkout failed");
    }
  };

  if (!user) {
    return (
      <div className="center">
        <div className="card">
          <h1>FocusForge</h1>
          <p>Login to continue</p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="topbar">
        <h2>FocusForge</h2>
        <p>{user.email}</p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Tasks</h3>

          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add task"
          />

          <button onClick={addTask}>Add</button>

          {tasks.map((t, i) => (
            <div key={i} className="task">
              {t}
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Pomodoro</h3>

          <h1>{formatTime(time)}</h1>

          <button onClick={() => setActive(true)}>Start</button>
          <button onClick={() => setActive(false)}>Pause</button>
          <button onClick={() => setTime(1500)}>Reset</button>
        </div>

        <div className="card">
          <h3>Premium</h3>

          <p>{isPremium ? "Premium Active" : "Free Plan"}</p>

          <button onClick={handleUpgrade}>
            Upgrade (£2.99/month)
          </button>
        </div>
      </div>
    </div>
  );
}