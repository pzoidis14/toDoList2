import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';
import CreateTodo from './CreateTodo';

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.refreshTodos = this.refreshTodos.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get('/api/todos');
    this.setState({ todos: res.data });
  }

  async removeTodo(todoId) {
    const res = await axios.delete(`/api/todos/${todoId}`);
    this.refreshTodos();
  }

  async refreshTodos() {
    const res = await axios.get('/api/todos');
    this.setState({ todos: res.data });
  }

  render() {
    return (
      <div id="todos">
        <CreateTodo refreshTodos={this.refreshTodos} />
        {this.state.todos.map(todo => (
          <Todo todo={todo} key={todo.id} removeTodo={this.removeTodo} />
        ))}
      </div>
    );
  }
}
