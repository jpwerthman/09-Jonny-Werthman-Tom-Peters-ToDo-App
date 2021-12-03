import React, { Component } from 'react';
import './App.css';
import NewTodo from './NewTodo';
import Todo from './Todo';

class App extends Component {
 constructor(){
   super()
   this.state = {
    todos: [],
    Text: '',
    completed: false
   }
   //this.state list of todos
   this.addTodo = this.addTodo.bind(this);
   this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
   this.complete = this.complete.bind(this);
   this.sortByOldest = this.sortByOldest.bind(this);
}
addTodo(sentText) {
    //Setting variable for form input (get from HTML form)
var data = {
  text: sentText
}
// Initalize AJAX Request
var xhttp2 = new XMLHttpRequest();
// Response handler
var self = this;
xhttp2.onreadystatechange = function() {
  // Wait for readyState = 4 & 200 response
  if (this.readyState == 4 && this.status == 200) {

      // parse JSON response
      var todo = JSON.parse(this.responseText);
      console.log(todo);
      self.setState({todos: [...self.state.todos, todo]});
  } else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
  }
};
xhttp2.open("POST", "https://cse204.work/todos", true);
xhttp2.setRequestHeader("Content-type", "application/json");
xhttp2.setRequestHeader("x-api-key", "bf057c-756c2c-41b9e2-db63db-1c2e29");
xhttp2.send(JSON.stringify(data));
self.setState({text: ""}); 
}

complete(event){
   var xhttp4 = new XMLHttpRequest();

  
   var self = this;
   self.setState({completed:event});
    console.log(this.state.completed)
   xhttp4.onreadystatechange = function() {
    
// Wait for readyState = 4 & 200 response
if (this.readyState == 4 && this.status == 200) {
  // event.target.parentElement.style.textDecoration = "line-through";
  // console.log(event.target.parentElement.style.textDecoration);
  
  

} else if (this.readyState == 4) {

  // this.status !== 200, error from server

}
};
  
  // xhttp4.open("PUT", "https://cse204.work/todos/"+event.target.parentElement.id, true);
  // xhttp4.setRequestHeader("x-api-key","bf057c-756c2c-41b9e2-db63db-1c2e29");
  // xhttp4.send();


}



sortByOldest(){
var unsorted =this.state.todos

unsorted.sort(function (a, b) {
  return a.text.localeCompare(b.text);
})


// var last = unsorted.length
// var temp = unsorted.length
// for( var k = 0; k<unsorted.length; k++){
//   last = k
//   for( var b=k+1; b<unsorted.length;b++){
//     if (unsorted[b].created<unsorted[last].created){
//       last = b
//     }
//   }
//   temp = unsorted[k]
//   unsorted[k]= unsorted[last]
//   unsorted[last]=temp
// }
this.setState({
  todos: unsorted })
}










removeDeletedTodo(event){
  console.log(event.target.parentElement);
    var xhttp3 = new XMLHttpRequest();
    var id = event.target.parentElement.id
//     var data = {
//     click: event
// }
var self = this;
    xhttp3.onreadystatechange = function() {

// Wait for readyState = 4 & 200 response
if (this.readyState == 4 && this.status == 200) {
    //event.target.parentElement.style.display = "none";
    const remainingTodos = self.state.todos.filter((todo) => {
      // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
      if (todo.id !== id) {
        return todo;
      }
    });
    self.setState({todos: remainingTodos});
} else if (this.readyState == 4) {

    // this.status !== 200, error from server
    console.log(this.responseText);

}
};
  console.log(event.target.parentElement.id)
    xhttp3.open("DELETE", "https://cse204.work/todos/"+id, true);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key","bf057c-756c2c-41b9e2-db63db-1c2e29");
    xhttp3.send();
}




 componentDidMount(){
  var xhttp = new XMLHttpRequest();
 var self = this;
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todos = JSON.parse(this.responseText);
          console.log(todos);
          self.setState({todos: todos})
      }
  };
  xhttp.open("GET", "https://cse204.work/todos", true);
  xhttp.setRequestHeader("x-api-key","bf057c-756c2c-41b9e2-db63db-1c2e29");
  xhttp.send();

  
//load todos from server and set state
 }
 //print todo function with forloop
 printTodo(){
 
 }
  render() {
    return (
      <><div className="row">
        <div className="col-xs-8 col-sm-8 col-md-8">
          <div className="input-group input-group-lg create"> 
            
              <h1 id="mainTitle">ToDo App</h1>
            
          </div>
        </div>
      </div>
      <section id="myTodos">
         
          <NewTodo addToDo ={this.addTodo} sort = {this.sortByOldest}/>
          {this.state.todos.map((todo) =>
  <Todo key={todo.id} id={todo.id} complete={this.complete} 
    text={todo.text} removeDeletedTodo={this.removeDeletedTodo}/>
)}
        </section></>

    );
  }
}

export default App;
