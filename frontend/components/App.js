import React from 'react';
import Form from './Form';
import TodoList from './TodoList';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      showCompleted: true,
    };
  }

  addTodo = (todoText) => {
    const newTodo = { name: todoText, completed: false };
    this.postNewTodo(newTodo).then((postedTodo) => {
      this.setState(prevState => ({
        todos: [...prevState.todos, postedTodo]
      }));
    }).catch(error => console.error("Failed to add todo:", error));
  };

  postNewTodo = (todo) => {
    return axios.post(URL, todo)
      .then(response => response.data)
      .catch(error => {
        throw new Error("There was an error posting the new todo:", error);
      });
  };

  toggleTodo = (id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          this.toggleCompleted(updatedTodo); // Call to patch the updated todo
          return updatedTodo;
        }
        return todo;
      });
      return { todos };
    });
  };

  toggleCompleted = (todo) => {
    axios.patch(`${URL}/${todo.id}`, { completed: todo.completed })
      .then(response => {
        // Optionally update todo in state if needed, based on response
        console.log("Todo updated successfully", response.data);
      })
      .catch(error => console.error("Failed to update todo:", error));
  };

  toggleShowCompleted = () => {
    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted,
    }));
  };

  componentDidMount() {
    axios.get(URL)
      .then((response) => this.setState({ todos: response.data.data }))
      .catch((error) => console.error("There was an error fetching the todos:", error));
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
