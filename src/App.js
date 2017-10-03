import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

const Todo = ({item}) => {
  return (
   <li>{item.title}
      <input
         type="checkbox"
         id={item.id}
         checked={item.complete} />
      <label htmlFor={item.id}></label>
      <button>
         <i className="fa fa-trash"></i>
      </button>
   </li>
  );
}

const ToDoCount = ({number}) => {
  return (
  <div>
    {number > 1 || number === 0 ? "Todos" : "Todo"}
  </div>
  )
}

const ClearButton = ({removeCompleted}) => {
  return(
  <button onClick={removeCompleted}>
    Remove
  </button>
  )
}

// removeCompleted(){
//   console.log("hi")
// }

class ToDo extends Component{
  render(){
    const todos =[
      { id: 0, title: 'Learn React', complete: false }
    ];
    return (
      <div className="todo-list">
      <h1>Hello</h1>
        <ul>
          {todos.map((todo, i) => <Todo item= {todo} key={i} />)}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={35} />
          <ClearButton removeCompleted={"this will be this.removeCompleted"} />
        </div>
      </div>
    );
  }
}

export default ToDo;

Todo.proptype={
  number: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  })
};

ClearButton.proptype={
  removeCompleted: PropTypes.string.isRequired
};

ToDoCount.proptype={
  ToDoCount: PropTypes.number.isRequired
};
