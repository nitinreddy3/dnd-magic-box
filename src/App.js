import React, { useState } from 'react';
import './App.css';
import json from './stub.json'

function App() {
  const [tasks, setTasks] = useState(json.data)
  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let taskList = tasks.filter((task) => {
      if ((task.name === id) && (task.targetCategory === cat)) {
        task.category = cat;
      }
      return task;
    });

    setTasks([...taskList])
  };

  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const getCategorizedTasks = (category) => tasks.filter(i => i.category === category).map(t => <div
    key={t.name}
    onDragStart={(e) => onDragStart(e, t.name)}
    draggable
    className="draggable"
    style={{ backgroundColor: t.bgcolor }}
  >
    {t.name}
  </div>)

  return (
    <div className="container-drag">
      <h2 className="header">DRAG & DROP DEMO</h2>
      <div
        className="wip"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          onDrop(e, "common");
        }}
      >
        <span className="task-header">Common</span>
        {getCategorizedTasks("common")}
      </div>
      <div
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          console.log(e)
          onDrop(e, "categoryA")
        }}
      >
        <span className="task-header">A</span>
        {getCategorizedTasks("categoryA")}
      </div>
      <div
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          console.log(e)
          onDrop(e, "categoryB")
        }}
      >
        <span className="task-header">B</span>
        {getCategorizedTasks("categoryB")}
      </div>
    </div>
  );
}

export default App;
