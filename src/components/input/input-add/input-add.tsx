import React from "react";
import { KEYCODE_TO_NAME } from "@constants";
import { InputValueEvent } from "@components/input/types";
import { inputWrapper } from "@components/input-wrapper";

interface InputAddProps {
  onSubmit?: (e: InputValueEvent) => void;
  onValue?: (e: InputValueEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
}

export class InputAddView extends React.Component<InputAddProps> {
  node: HTMLInputElement;

  onSubmit(e) {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        type: "submit",
        value: this.node.value,
      });
    }

    this.node.value = "";
    e.preventDefault();
  }

  onKeyDown(e) {
    console.log(KEYCODE_TO_NAME[e.which]);
    switch (KEYCODE_TO_NAME[e.which]) {
      case "ENTER": {
        this.onSubmit(e);
      }
    }
  }

  onInput(e) {
    this.props.onValue({
      type: "string",
      value: this.node.value,
    });
  }

  render() {
    return (
      <div className="input-add">
        <input
          ref={(node) => { this.node = node; }}
          type="text"

          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          onInput={(e) => this.onInput(e)}
          onKeyDown={(e) => { this.onKeyDown(e); }}
        />
        <button onClick={(e) => this.onSubmit(e)}>+</button>
      </div>
    );
  }
}

export const InputAdd =
  inputWrapper<InputAddProps>(InputAddView);