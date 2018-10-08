const SUBSCRIBERS: {
  [key: string]: ActionSubscriber[]
} = {};

interface ActionEvent {
  type: string;
  value?: {
    [key: string]: any;
  };
}

interface ActionSubscriber {
  (e: ActionEvent): void;
}

export function dispatch(name: string, e: ActionEvent) {
  const subscribers = SUBSCRIBERS[name] || [];
  let i = -1;
  const n = subscribers.length;
  while (++i < n) {
    subscribers[i](e);
  }
  console.log("ACTION -> dispatch: " + name + "(" + n + ")", e);
}

export function subscribe(name: string, callback: ActionSubscriber) {
  SUBSCRIBERS[name] = (SUBSCRIBERS[name] || []).concat(callback);
}