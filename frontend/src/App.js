// App.jsx  (your existing logic stays the same)
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((d) => setData(d.now))
      .catch((err) => {
        console.error(err);
        setData("—");
      });
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <h1>Fullstack Docker App</h1>
        <div className="time-display">
          <div className="label">Server Time</div>
          <div className="value">{data || "Loading..."}</div>
        </div>
      </div>
    </div>
  );
}

export default App;