import React from 'react';

export default class Todo extends React.Component {
  render() {
    const { todo, index, toggleTodo } = this.props;
    return (
      <li
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={() => toggleTodo(todo.id)}
      >
        <span>
          {index + 1}. {todo.name}
        </span>
        {todo.completed && <span>✓</span>}
      </li>
    );
  }
}