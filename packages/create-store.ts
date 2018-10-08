interface StateDidChange<T> {
  (prevState: T, nextState: T): void;
}

type StateDidChangeHandler<T> =
  { storeDidChange: StateDidChange<T> };

type StateSubscriber<T> =
  StateDidChange<T> | StateDidChangeHandler<T>;

export function createStore<T = {}>(state: T = {} as T) {
  const subscribers: StateSubscriber<T>[] = [];

  const store = {
    state,
    subscribers,

    setState(value: Partial<T>) {
      Promise.resolve(value)
        .then(() => {
          const prevState = this.state;
          this.state = Object.assign({}, this.state, value);
          this.dispatchStateDidChange(prevState);
        })
        .catch((err) => {
          console.error(err);
        });

      return this;
    },

    dispatchStateDidChange(prevState: T) {
      let i = -1;
      const n = store.subscribers.length;

      while (++i < n) {
        if (typeof store.subscribers[i] === "function") {
          (store.subscribers[i] as StateDidChange<T>)(prevState, this.state);
        } else {
          (store.subscribers[i] as StateDidChangeHandler<T>).storeDidChange(prevState, this.state);
        }
      }
    },

    onChange(subscriber: StateSubscriber<T>) {
      store.subscribers.push(subscriber);
      return this;
    },

    offChange(subscriber: StateSubscriber<T>) {
      store.subscribers = store.subscribers.filter((a) => a !== subscriber);
      return this;
    },
  };

  return store;
}