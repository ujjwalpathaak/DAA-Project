import React from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
