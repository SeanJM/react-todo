import React from "react";
import { InputValueEvent } from "@components/input/types";

interface InputWrapperInProps {
  placeholder?: string;
  onValue?: (e: InputValueEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

type InputWrapperOutProps<T> = T & InputWrapperInProps;

interface InputWrapperState {
  hasFocus: boolean;
  hasContent: boolean;
}

export function inputWrapper<T = {}>(Component: React.ComponentType<InputWrapperInProps>) {
  return class InputWrapperComponent extends React.Component<InputWrapperOutProps<T>, InputWrapperState> {
    constructor(props) {
      super(props);
      this.state = {
        hasFocus: false,
        hasContent: false,
      }
    }

    render() {
      const classList = [ "input-wrapper" ];

      const {
        onValue,
        onFocus,
        onBlur,
        placeholder
      } = this.props;

      if (this.state.hasFocus) {
        classList.push("input-wrapper--focus");
      }

      if (this.state.hasContent) {
        classList.push("input-wrapper--content");
      }

      return (
        <div className={classList.join(" ")}>
          {placeholder
            ? (
              <div className="input-wrapper_placeholder">
                {placeholder}
              </div>
            )
            : null
          }

          <div className="input-wrapper_input">
            {React.createElement(Component, {
              ...this.props as object,

              onValue: (e: InputValueEvent) => {
                if (onValue) {
                  onValue(e);
                }

                this.setState({
                  hasContent: !!e.value
                });
              },

              onFocus: (e) => {
                if (onFocus) {
                  onFocus(e);
                }

                this.setState({
                  hasFocus: true
                });
              },

              onBlur: (e) => {
                if (onBlur) {
                  onBlur(e);
                }

                this.setState({
                  hasFocus: false
                });
              }
            })}
          </div>
        </div>
      );
    }
  }
}