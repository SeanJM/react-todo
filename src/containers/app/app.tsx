import React, { Component } from "react";
import { dispatch } from "@action";
import { withStore, StoreState, StoreTodo } from "@store";

import { FormValue, Form } from "@components/form";
import { InputAction } from "@components/input";
import { TodoElement } from "@components/todo-element";

interface AppProps {
  complete: StoreTodo[];
  incomplete: StoreTodo[];
  total: number;
}

function mapStateToProps(state: StoreState): AppProps {
  return {
    complete: state.todos.filter(a => a.completed),
    incomplete: state.todos.filter(a => !a.completed),
    total: state.todos.length,
  };
}

export class App extends Component<AppProps, {}> {
  formValue: FormValue<{
    todoAdd: string;
  }>;

  constructor(props) {
     super(props);
     this.formValue = {};
  }

  handleEvent({ value }: Partial<{ type: string, value?: any}>) {
    this.formValue = value;
  }

  render() {
    return (
      <div className="todo-list">
        <h2>Todos</h2>
        <h1>{this.props.complete.length}/{this.props.total}</h1>
        <Form onValue={this}>
          <InputAction
            placeholder="Title"
            name="todoAdd"
            action={
              <button onClick={() => dispatch("TODO", {
                type: "ADD",
                value: {
                  title: this.formValue.todoAdd
                }
              })}>+</button>
            }
          />
        </Form>
        <ul className="todo-list_items">
          {this.props.complete.map((todo) => <TodoElement {...todo}/>)}
          {this.props.incomplete.map((todo) => <TodoElement {...todo}/>)}
        </ul>
      </div>
    );
  }
}

export const AppConnect = withStore(App, mapStateToProps);