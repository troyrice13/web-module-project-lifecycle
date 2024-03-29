import React from 'react';
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      showCompleted: true,
    }
  }

  addTodo = (todoText) => {
    const todo = { id: Date.now(), name: todoText, completed: false };
    this.setState(prevState => ({
      todos: [...prevState.todos, todo]
    }), () => {
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to create todo');
        }
        return res.json();
      })
      .then(({ todo }) => {
        this.setState(prevState => ({
          todos: prevState.todos.map(t => t.id === todo.id ? todo : t)
        }))
      })
      .catch(err => {
        console.error(err);
        this.setState(prevState => ({
          todos: prevState.todos.filter(t => t.id !== todo.id)
        }))
      });
    });
  };

  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }), () => {
      const todo = this.state.todos.find(t => t.id === id);
      fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: todo.completed }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update todo');
        }
        return res.json();
      })
      .catch(err => {
        console.error(err);
        this.setState(prevState => ({
          todos: prevState.todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }));
      });
    });
  };

  toggleShowCompleted = () => {
    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted,
    }));
  };

  componentDidMount() {
    const getTodos = () => {
      fetch(URL)
        .then((res) => res.json())
        .then((todos) => this.setState({ todos: todos.data }))
    }
    getTodos();
  }

  render() {
    const filteredTodos = this.state.showCompleted ? this.state.todos : this.state.todos.filter(todo => !todo.completed);

    return (
      <div>
        <Form addTodo={this.addTodo} />
        <button onClick={this.toggleShowCompleted}>
          {this.state.showCompleted ? 'Hide Completed' : 'Show Completed'}
        </button>
        <TodoList todos={filteredTodos} toggleTodo={this.toggleTodo} />
      </div>
    );
  }
}