import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [counts, setCounts] = useState({ total: null, processed: null });
  const [enqueueResult, setEnqueueResult] = useState(null);
  const [error, setError] = useState(null);
  const getCounts = () => {
    fetch("/api/queue_counts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GET failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCounts(data);
      })
      .catch((err) => setError(err.message));
  };

  // GET /api/queue_counts
  useEffect(() => {
    getCounts();
  }, []);

  // POST /api/enqueue
  const enqueueTest = async () => {
    try {
      const res = await fetch("/api/enqueue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "test name" }),
      });

      if (!res.ok) {
        throw new Error(`POST failed: ${res.status}`);
      }

      const data = await res.json();
      setEnqueueResult(data);
      getCounts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>API Test</h1>

      <section>
        <h2>GET /api/queue_counts</h2>
        <pre>
          {counts.total !== null
            ? `Processed ${counts.processed} out of ${counts.total}`
            : "Loading..."}
        </pre>
      </section>

      <section>
        <h2>POST /api/enqueue</h2>
        <button onClick={enqueueTest}>Enqueue Test Name</button>
        <pre>
          {enqueueResult
            ? `Enqueued job ${enqueueResult.jobId}`
            : "No response yet"}
        </pre>
      </section>

      {error && (
        <section style={{ color: "red" }}>
          <h2>Error</h2>
          <pre>{error}</pre>
        </section>
      )}
    </>
  );
}

export default App;
