import React from "react";
import { InputValueEvent } from "@components/input/types";
import { inputWrapper } from "@components/input-wrapper";

interface InputActionProps {
  action: JSX.ElementChildrenAttribute["children"];
  name?: string;
  onBlur?: (e: React.FocusEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onValue?: (e: InputValueEvent) => void;
}

export const InputAction = inputWrapper<InputActionProps>(function (props: InputActionProps) {
  return (
    <div className="input-action">
      <input type="text"
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onInput={(e) => {
          const { value } = e.target as HTMLInputElement;
          props.onValue({
            value,
            type: "string"
          });
        }}
      />
      {props.action}
    </div>
  );
});