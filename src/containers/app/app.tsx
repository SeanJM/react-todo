import React, { Component } from "react";
import { dispatch } from "@action";
import { withStore, StoreState, StoreTodo } from "@store";

import { FormValue } from "@components/form";
import { InputActionElement } from "@components/input";
import { TodoElement } from "@components/todo-element";

interface AppProps {
  complete: StoreTodo[];
  incomplete: StoreTodo[];
  total: number;
}

interface AppState {
  title: string | null;
}

function mapStateToProps(state: StoreState): AppProps {
  return {
    complete: state.todos.filter(a => a.completed),
    incomplete: state.todos.filter(a => !a.completed),
    total: state.todos.length,
  };
}

function AddButton(props) {
  return (
    <button
      disabled={!props.value.length}
      onClick={props.submit}>
      +
    </button>
  );
}

export class App extends Component<AppProps, AppState> {
  formValue: FormValue<{
    todoAdd: string;
  }>;

  constructor(props) {
    super(props);
    this.formValue = {};
    this.state = {
      title: null,
    };
  }

  handleEvent({ value }: Partial<{ type: string, value?: any}>) {
    this.formValue = value;
  }

  render() {
    return (
      <div className="todo-list">
        <h2>Todos</h2>
        <h1>{this.props.complete.length}/{this.props.total}</h1>
        <InputActionElement
          placeholder="Title"
          component={AddButton}
          onSubmit={(e) => dispatch("TODO", {
            type: "ADD",
            value: {
              title: e.value
            }
          })}
        />
        <ul className="todo-list_items">
          {this.props.complete.map((todo) => <TodoElement key={todo.id} {...todo}/>)}
          {this.props.incomplete.map((todo) => <TodoElement key={todo.id} {...todo}/>)}
        </ul>
      </div>
    );
  }
}

export const AppConnect = withStore(App, mapStateToProps);