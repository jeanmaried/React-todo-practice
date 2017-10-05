import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

const Todo = ({item, toggleComplete, removeToDo}) => {
  return (
   <li>{item.title}
      <input
         type="checkbox"
         id={item.id}
         checked={item.complete}
         onChange={toggleComplete} />
      <label htmlFor={item.id}></label>
      <button onClick={removeToDo}>
         <i className="fa fa-trash"></i>
      </button>
   </li>
  );
}

const ToDoCount = ({number}) => {
  return (
  <div>
    {number > 1 || number === 0 ? number + " " + "Todos" : "Todo"}
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

class ToDo extends Component{
  constructor(){
    super();
    this.removeCompleted = this.removeCompleted.bind(this);

    this.state = {
      todos: [{ id: 0, title: 'Learn React', complete: false }, {id: 1, title: 'Love React', complete: false}],
      lastId: 0
    }
  }

  addToDo = (event) => { //the arrow is binding this to addToDo
    event.preventDefault();
    const id = this.state.lastId + 1;
    
    if(this.toDoInput.value){
      let todos = this.state.todos.concat({
        id,
        title: this.toDoInput.value,
        complete: false
      })

      this.setState({
        todos,
        lastId: id
      })
      this.toDoInput.value = ""
    }
  }

  toggleComplete(item){
    let todos = this.state.todos.map((todo)=>{
      if (todo.id === item.id){
        todo.complete = !todo.complete;
      }
      return todo;
    })
    this.setState({todos});
  }

  removeToDo(item){
    let todos = this.state.todos.filter((todo) => {
      return todo.id !== item.id
    })
    this.setState({todos});
  }

  removeCompleted({removeCompleted}){
    let todos = this.state.todos.filter((todo => !todo.complete));
    this.setState({todos});
  }

  hasCompleted(){
    let todos= this.state.todos.filter((todo => todo.complete));
    if(todos.length > 0){
      return true;
    }
    else{
      return false;
    }
  }

  componentDidMount(){
    this.toDoInput.focus();
  }

  render(){
    return (
      <div className="todo-list">
      <h1>Hello</h1>

      <div className="add-todo">
        <form name="addTodo" onSubmit={this.addToDo}>
          <input type="text" ref={(input) => (this.toDoInput = input)} />
          <span>(press enter to add)</span>
        </form>
      </div>

        <ul>
          {this.state.todos.map((todo, i) => (
            <Todo
            item={todo}
            key={i}
            toggleComplete={this.toggleComplete.bind(this, todo)}
            removeToDo={this.removeToDo.bind(this, todo)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() ? <ClearButton removeCompleted={this.removeCompleted} />: ""}
        </div>
      </div>
    );
  }
}

export default ToDo;

Todo.proptype={
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }),
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired
};

ClearButton.proptype={
  removeCompleted: PropTypes.func.isRequired
};

ToDoCount.proptype={
  ToDoCount: PropTypes.number.isRequired
};


