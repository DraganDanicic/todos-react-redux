import React, { Component } from "react";
import TodoModel from "../../models/TodoModel";

interface TodosState {
  inputTodoText: string,
  lastId: number;
  todos: TodoModel[];
}

export default class Todos extends Component<{}, TodosState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      inputTodoText: '',
      lastId: 2,
      todos: [
        { id: 1, text: 'Do something today' },
        { id: 2, text: 'Do something else' },
      ]
    }       
  }

  setInputTodoText (text: string) {
    this.setState(state => ({
      ...state, 
      inputTodoText: text
    }))
  }  

  addTodo (): void {
    this.setState(state => ({
        ...state,
        ...{
          inputTodoText: '',
          lastId: state.lastId + 1,
          todos: [
            ...state.todos,
            {id: state.lastId + 1, text: this.state.inputTodoText}
          ]
        }
      })
    )
  }

  removeTodo (id: number): void {
    this.setState(state => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id)
    }))
  }

  render () {
    return (
      <>
      <input type="text"
        value={this.state.inputTodoText}
        onChange={event => this.setInputTodoText(event.target.value)}
        onKeyDown={event => {
          event.stopPropagation();
          if (event.keyCode === 13) {
            this.addTodo();
          }
        }}
      />
      <button onClick={
        () => this.addTodo()
      }>Add</button>
      <ul>
        {this.state.todos.map(todo => <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => this.removeTodo(todo.id)}>X</button>
        </li>)}
      </ul>
      </>
     )
  }
}