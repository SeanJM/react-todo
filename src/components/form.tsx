import React from "react";
import { InputValueEvent } from "@components/input/types";

interface FormChildProps {
  name: string;
  [key: string]: any;
}

type FormChild = React.ReactElement<FormChildProps>;
type FormOnValue = (e: FormValueEvent) => void;

export type FormValue<T = {}> = {
  [P in keyof T]?: T[P];
}

interface FormValueEvent {
  type: string;
  value: FormValue;
}

interface FormProps extends JSX.ElementChildrenAttribute {
  onValue: FormOnValue | Partial<{ handleEvent: FormOnValue }>;
  children: FormChild | FormChild[];
}

interface FormInputValueEvent extends InputValueEvent {
  name: string;
}

export class Form extends React.Component<FormProps> {
  formValue: FormValue;

  constructor(props) {
    super(props);
    this.formValue = {};
  }

  onValue(e: FormInputValueEvent) {
    const formValueEvent: FormValueEvent = {
      type: "formvalue",
      value: this.formValue
    };

    this.formValue[e.name] = e.value;
    console.log(formValueEvent);
    if (typeof this.props.onValue === "function") {
      this.props.onValue(formValueEvent);
    } else {
      this.props.onValue.handleEvent(formValueEvent);
    }
  }

  render() {
    const childrenList = React.Children.toArray(this.props.children) as FormChild[];
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        {childrenList.map(child => {
          return React.cloneElement(child, {
            onValue: (e: InputValueEvent) => {
              this.onValue({
                ...e,
                name: child.props.name,
              });
            }
          });
        })}
      </form>
    );
  }
}