import React, { useState, useEffect } from 'react';
import './App.css';
import json from './stub.json'

function App() {
  const [tasks, setTasks] = useState(json.data)
  let [categoryA, setCategoryA] = useState([])
  let [categoryB, setCategoryB] = useState([])
  let [common, setCommon] = useState(json.data)

  useEffect(() => {
    setTasks([...json.data])
  }, [])


  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    common.forEach((task) => {
      if ((task.name === id) && (task.targetCategory === cat)) {
        task.category = cat;
        if (cat === "categoryA") {
          categoryA = [...categoryA, task];
          setCategoryA([...categoryA]);
        } else if (cat === "categoryB") {
          categoryB = [...categoryB, task];
          setCategoryB([...categoryB]);
        }
        setCommon([...common.filter(i => i.name !== id)]);
      }
    });
  };

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const getCategorizedTasks = (category) => category.length ? category.map(t => <div
    key={t.name}
    onDragStart={(e) => onDragStart(e, t.name)}
    draggable
    className="draggable"
    style={{ backgroundColor: t.bgcolor }}
  >
    {t.name}
  </div>) : ''

  const reset = () => {
    setCommon([...json.data])
    setCategoryA([]);
    setCategoryB([]);
  }

  return (
    <div className="container-drag">
      <h2 className="header">DRAG & DROP BOXES</h2>
      <div
        className="common"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "common")}
      >
        <span className="task-header">Common</span>
        {getCategorizedTasks(common)}
      </div>
      <div className="wrapper">
        <div
          className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "categoryA")}
        >
          <span className="task-header">A</span>
          {getCategorizedTasks(categoryA)}
        </div>
        <div
          className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "categoryB")}
        >
          <span className="task-header">B</span>
          {getCategorizedTasks(categoryB)}
        </div>
      </div>
      <button className="reset-btn" onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
