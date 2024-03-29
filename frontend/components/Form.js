
import React from 'react';

export default class Form extends React.Component {
  state = { newTodo: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.newTodo);
    this.setState({ newTodo: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='todo'>New Item</label>
          <br />
          <input
            value={this.state.newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
            type='text'
            id='todo'
          />
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}
