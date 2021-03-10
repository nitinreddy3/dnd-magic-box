import React, { useState } from 'react';
import './App.css';
import json from './stub.json'

function App() {
  let [categoryA, setCategoryA] = useState([])
  let [categoryB, setCategoryB] = useState([])
  let [common, setCommon] = useState(json.data)

  /**
   *
   * @param {*} category
   * @param {*} task
   * @param {*} id
   */
  const setStateForCategory = (category, task, id) => {
    if (category === "categoryA") {
      setCategoryA([...categoryA, task].sort());
    } else if (category === "categoryB") {
      setCategoryB([...categoryB, task].sort());
    }
    setCommon([...common.filter(i => i.name !== id)]);
  }

  /**
   *
   * @param {*} event
   * @param {*} category
   */
  const onDrop = (event, category) => {
    let id = event.dataTransfer.getData("id");
    common.forEach((task) => {
      const { name, targetCategory } = task;
      if ((name === id) && (targetCategory === category)) {
        task = { ...task, category };
        setStateForCategory(task.targetCategory, task, id)
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
    onClick={onClickHandler}
    id={t.name}
  >
    {t.name}
  </div>) : ''

  const onClickHandler = (event) => {
    let timer;
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(() => {
        console.log("SINGLE CLICK");
      }, 500)
    } else if (event.detail === 2) {
      let id = event.target.id
      common.forEach((task) => {
        const { name, targetCategory } = task;
        if ((name === id)) {
          task = { ...task, category: targetCategory };
          setStateForCategory(task.category, task, id)
        }
      });
    }
  }

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
        <span className="task-header">Common Category</span>
        {getCategorizedTasks(common)}
      </div>
      <div className="wrapper">
        <div
          className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "categoryA")}
        >
          <span className="task-header">Category A</span>
          {getCategorizedTasks(categoryA)}
        </div>
        <div
          className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "categoryB")}
        >
          <span className="task-header">Category B</span>
          {getCategorizedTasks(categoryB)}
        </div>
      </div>
      <button className="reset-btn" onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
