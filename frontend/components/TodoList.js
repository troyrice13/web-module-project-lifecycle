import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <ul className='todo-list'>
        {this.props.todos.map((todo, index) => (
          <Todo
            key={todo.id}
            todo={todo}
            index={index}
            toggleTodo={this.props.toggleTodo}
          />
        ))}
      </ul>
    );
  }
}
