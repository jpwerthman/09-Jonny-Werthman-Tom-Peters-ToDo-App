import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: "",
      Text: '',
      removeDeletedTodo:"",
      completed: false
    }
   
    this.removeTodo = this.removeTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }
  
    //todo text and ID in state
    //delete function and complete function
    //text id and state come from props
  
  removeTodo(event){
    event.preventDefault();
    this.props.removeDeletedTodo(event)
  }
  completeTodo(event){
    event.preventDefault();
    this.state.completed= !this.state.completed
    
    this.props.complete(this.state.completed)

  }
  render() {
    var className2 = "checkX";
    if (this.state.completed) {
      className2 = "todoCompleted";}
      
    
    return (
      <>
      <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2">
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8" id={this.props.id}>
          <button type="button" className="btn btn-primary" className = "deleteX" onClick={this.removeTodo} >X</button>
          <button type="button" className="btn btn-primary" className = {className2}  onClick={this.completeTodo}>C</button>
          <p>{this.props.text}</p>
          </div>
          <div className="col-md-2">
          </div>
        </div></>
    );
  }
}

export default Todo;
