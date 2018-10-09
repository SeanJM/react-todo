import React from "react";
import { InputAction, InputActionProps } from "@components/input/input-action";
import { InputValueEvent } from "@components/input/types";

interface InputActionAddProps extends Pick<InputActionProps,
  | "name"
  | "placeholder"
> {
  onSubmit: (e: InputValueEvent) => void;
}

export class InputActionAdd extends React.Component<InputActionAddProps> {
  render() {
    return (
      <InputAction
        onSubmit={this.props.onSubmit}
        action={<button>+</button>}
      />
    )
  }
}