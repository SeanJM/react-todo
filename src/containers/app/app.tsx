import React, { Component } from "react";
import { InputAction } from "@components/input";
import { withStore, StoreState } from "@store";
import { dispatch } from "@action";
import { FormValue, Form } from "@components/form";

export class App extends Component<StoreState, {}> {
  formValue: FormValue<{
    todoAdd: string;
  }>;

  constructor(props) {
     super(props);
     this.formValue = {};
  }

  handleEvent({ value }) {
    this.formValue = value;
  }

  render() {
    return (
      <div className="todo-list">
        <h2>Todos</h2>
        <h1>{this.props.todos.filter(a => a.completed).length}/{this.props.todos.length}</h1>
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
          {
            this.props.todos.map((todo) => {
              const classList = ["todo"];
              if (todo.completed) {
                classList.push("todo--complete");
              }
              return (
                <li
                  className={classList.join(" ")}
                  onClick={() => dispatch("TODO", {
                    type: todo.completed ? "INCOMPLETE" : "COMPLETE",
                    value: {
                      id: todo.id
                    }
                  })}
                  key={todo.id}
                >
                  {todo.title}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export const AppConnect = withStore(App);