import React, { useState } from 'react';
import './App.css';
import json from './stub.json'

function App() {
  // states for the categories
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
  const onDropHandler = (event, category) => {
    let id = event.dataTransfer.getData("id");
    common.forEach((task) => {
      const { name, targetCategory } = task;
      if ((name === id) && (targetCategory === category)) {
        task = { ...task, category };
        setStateForCategory(task.targetCategory, task, id)
      }
    });
  };

  /**
   *
   * @param {*} event
   * @param {*} id of the current item selected
   */
  const onDragStartHandler = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  /**
   *
   * @param {*} event
   */
  const onDragOverHandler = (event) => {
    event.preventDefault();
  };

  /**
   *
   * @param {*} category
   * @returns component
   */
  const getCategorizedTasks = (category) => category.length ? category.map(item => <span
    key={item.name}
    onDragStart={(event) => onDragStartHandler(event, item.name)}
    className="draggable"
    // style={{ backgroundColor: item.bgcolor }}
    onClick={onClickHandler}
    id={item.name}
    draggable
  >
    {item.name}
  </span>) : ''

  /**
   *
   * @param {*} event
   */
  const onClickHandler = (event) => {
    let timer;
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(() => {
        console.log("SINGLE CLICK");
      }, 1000)
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

  /**
   * Resets the state of the categories
   */
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
        onDragOver={(event) => onDragOverHandler(event)}
        onDrop={(event) => onDropHandler(event, "common")}
      >
        <span className="taskHeader">Common Category</span>
        {getCategorizedTasks(common)}
      </div>
      <div className="wrapper">
        <div
          className="droppableContainer"
          onDragOver={(event) => onDragOverHandler(event)}
          onDrop={(event) => onDropHandler(event, "categoryA")}
        >
          <span className="taskHeader">Category A</span>
          {getCategorizedTasks(categoryA)}
        </div>
        <div
          className="droppableContainer"
          onDragOver={(event) => onDragOverHandler(event)}
          onDrop={(event) => onDropHandler(event, "categoryB")}
        >
          <span className="taskHeader">Category B</span>
          {getCategorizedTasks(categoryB)}
        </div>
      </div>
      <button className="resetBtn" onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
