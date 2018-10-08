import React from "react";
import { store } from "./store";

function defaultMapStateToProps(state, props) {
  return {
    ...state,
    ...props,
  };
}

export function withStore<T>(Component: React.ComponentType, mapStateToProps = defaultMapStateToProps) {
  return class ComponentConnect extends React.Component<T, {}> {
    storeDidChange(prevStore, nextStore) {
      this.forceUpdate();
    }

    componentDidMount() {
      store.onChange(this);
    }

    componentWillUnmount() {
      store.offChange(this);
    }

    render() {
      return (
        <Component {
          ...mapStateToProps(store.state, this.props)
        }/>
      );
    }
  }
}