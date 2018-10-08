import React from "react";
import { dispatch } from "@action";
import { StoreTodo } from "@store";

export function TodoElement(props: StoreTodo) {
  const classList = ["todo"];
  if (props.completed) {
    classList.push("todo--complete");
  }
  return (
    <li
      className={classList.join(" ")}
      onClick={() => dispatch("TODO", {
        type: props.completed ? "INCOMPLETE" : "COMPLETE",
        value: {
          id: props.id
        }
      })}
      key={props.id}
    >
      {props.title}
    </li>
  );
}