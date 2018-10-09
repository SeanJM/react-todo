import React from "react";
import { InputValueEvent } from "@components/input/types";
import { inputWrapper, InputWrapperProps } from "@components/input-wrapper";
import { KEYCODE_TO_NAME } from "@constants";

export type InputActionProps = InputWrapperProps<{
  action: React.ReactElement<{ onClick: (e: any) => void }>;
  name?: string;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onValue?: (e: InputValueEvent) => void;
  onSubmit?: (e: InputValueEvent) => void;
}>;

export class InputActionView extends React.Component<InputActionProps> {
  node: HTMLInputElement;

  onSubmit(e) {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        type: "string",
        value: this.node.value,
      });
    }

    this.node.value = "";
    e.preventDefault();
  }

  onKeyDown(e) {
    switch (KEYCODE_TO_NAME[e.which]) {
      case "ENTER": {
        this.onSubmit(e);
      }
    }
  }

  render() {
    const {
      action,
      onBlur,
      onFocus,
      onValue,
    } = this.props;

    return (
      <div className="input-action">
        <input type="text"
          ref={(node) => { this.node = node; }}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={(e) => this.onKeyDown(e)}
          onInput={(e) => {
            const { value } = e.target as HTMLInputElement;
            onValue({
              value,
              type: "string"
            });
          }}
        />
        {React.cloneElement(action, {
          onClick: (e) => {
            if (action.props.onClick) {
              action.props.onClick(e);
            }
            this.onSubmit(e);
          }
        })}
      </div>
    );
  }
}

export const InputAction =
  inputWrapper<InputActionProps>(InputActionView);