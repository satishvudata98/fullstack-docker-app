import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState("");

  useEffect(() => {

    fetch("/api/health")
      .then(res => res.json())
      .then(d => setData(d.now));

  }, []);

  return (
    <div>
      <h1>Fullstack Docker App</h1>
      <p>Server Time: {data}</p>
    </div>
  );
}

export default App;
