import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
 constructor(){
     super()
     this.state = {
        text: ""
      }
     this.addTodo2 = this.addTodo2.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.enterKeyPress = this.enterKeyPress.bind(this);
      this.sort = this.sort.bind(this)
 }

sort(){
    this.props.sort()
}



 
 handleChange(event) {
     event.preventDefault();
     console.log(event.target.value)
     this.setState({text : event.target.value})
 }
 
 //add todo function  send to server
 //onchange function for form updates state based on typing
 addTodo2(event){
    event.preventDefault();
    console.log(this.state.text)
    this.props.addToDo(this.state.text)
    document.getElementById("createText").value=""
    
 }
 enterKeyPress(event) {
    if(event.keyCode === 13){
        console.log(this.state.text)
        this.addTodo2(event)
       document.getElementById("createText").value=""
       
       
    }
}
    render() {
    return (
        <div>
        <div className="row " >
                <div className="col-xs-8 col-sm-8 col-md-8 box">
                
                <button  type="button" className="btn btn-primary" id = "addItemButton" onClick={this.addTodo2} >Add Item</button>
              
                <input onKeyDown={this.enterKeyPress} value= {this.props.text} type="text" className="form-control createtext" id = "createText" onChange={this.handleChange} placeholder = "Enter your ToDo Items Here! Press Enter to submit." aria-label="Large" aria-describedby="inputGroup-sizing-sm" >
                     </input>
                     <button  type="button" className="btn btn-primary" id = "sort" onClick={this.sort} >sort alphetically</button> 
        </div>
            </div>
            </div>
            
    );
  }
}

export default NewTodo;