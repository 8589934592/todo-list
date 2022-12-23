import React, { Component } from "react";
import todoApi from "./api/todoApi";
import "./app.scss";
import Form from "./components/form/Form";
import List from "./components/list/List";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSaveTodo = this.handleSaveTodo.bind(this);
    this.handlePrepareEdit = this.handlePrepareEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  initTodo = { id: undefined, name: "", status: undefined };
  state = {
    todos: [this.initTodo],
    todo: this.initTodo,
  };

  renderData(todo) {
    const response = todoApi.get();
    this.setState({
      ...this.state,
      todos: response,
      todo: todo ? todo : this.state.todo,
    });
  }

  componentDidMount() {
    this.renderData();
  }

  handleSaveTodo(todo) {
    let oldTodo = this.state.todo
    if(todo.id === undefined) {
      todo = {...this.initTodo}
    }
    else if (oldTodo.status !== todo.status) {
      todo = {...this.initTodo}
    }
    todoApi.save({ ...todo, status: todo.status ?? 0 });
    //render list
    this.renderData({ ...this.initTodo });
  }

  handleDelete(id) {
    todoApi.delete(id)
    this.renderData()
  }

  handlePrepareEdit(todo) {
    this.setState({
      ...this.state,
      todo: todo,
    });
  }

  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <div className="title">
          Todo <strong>list</strong>
        </div>
        <div className="todo-list">
          <Form
            handleSaveTodo={this.handleSaveTodo}
            todo={this.state.todo || this.initTodo}
            check={Math.random()}
          />
          <List
            todos={this.state.todos}
            handlePrepareEdit={this.handlePrepareEdit}
            handleDelete={this.handleDelete}
            handleSaveTodo={this.handleSaveTodo}
          />
        </div>
      </div>
    );
  }
}
