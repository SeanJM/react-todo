import React from "react";
import { InputValueEvent } from "@components/input/types";
import { inputWrapper, InputWrapperProps } from "@components/input-wrapper";
import { KEYCODE_TO_NAME } from "@constants";

export type InputActionElementProps = InputWrapperProps<{
  component: React.ComponentType<{
    value: string;
    submit: () => void;
  }>;
  name?: string;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onValue?: (e: InputValueEvent) => void;
  onSubmit?: (e: InputValueEvent) => void;
}>;

export interface InputActionState {
  value: string;
}

export class InputActionElementView extends React.Component<InputActionElementProps, InputActionState> {
  node: HTMLInputElement;

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onSubmit() {
    this.props.onSubmit({
      type: "string",
      value: this.state.value,
    });
  }

  onKeyDown(e: React.KeyboardEvent) {
    if (KEYCODE_TO_NAME[e.which] === "ENTER") {
      this.onSubmit();
    }
  }

  onInput(e: React.FormEvent) {
    const { value } = (e.target as HTMLInputElement);

    this.setState({
      value
    });

    this.props.onValue({
      type: "string",
      value
    })
  }

  render() {
    const {
      component,
    } = this.props;

    return (
      <div className="input-action">
        <input type="text"
          onKeyDown={(e) => this.onKeyDown(e)}
          onInput={(e) => this.onInput(e)}
        />
        {React.createElement(component, {
          value: this.state.value,
          submit: () => this.onSubmit(),
        })}
      </div>
    );
  }
}

export const InputActionElement =
  inputWrapper<InputActionElementProps>(InputActionElementView);