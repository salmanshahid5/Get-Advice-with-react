import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import 'antd/dist/reset.css';

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const jsonData = await response.json();
      setAdvice(jsonData.slip.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <div className="container">
      <h1 className="tittle">Advice of the Day</h1>
      <div className="advice-container">
        {loading ? (
          <Spin size="large" /> 
        ) : (
          <p className="advice">{advice}</p>
        )}
      </div>
      <button className="button" onClick={fetchAdvice}>Get New Advice</button>
    </div>
  );
}

export default App;
