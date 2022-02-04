import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleCountChange = (step: number) => () => {
    setCount(count + step);
  };

  return (
    <>
      <h1>欢迎进入React世界~</h1>
      <div>计数器：{count}</div>
      <button onClick={handleCountChange(1)}>+1</button>
      <button onClick={handleCountChange(-1)}>+1</button>
      <Outlet />
    </>
  );
};

export default App;
