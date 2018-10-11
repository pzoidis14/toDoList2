import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      assignee: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { data } = await Axios.post('/api/todos', this.state);

    this.props.refreshTodos();

    this.setState({
      taskName: '',
      assignee: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          name="taskName"
          type="text"
          value={this.state.taskName}
          onChange={this.handleChange}
        />

        <label htmlFor="assignee">Assign To:</label>
        <input
          name="assignee"
          type="text"
          value={this.state.assignee}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
