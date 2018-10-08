import { createStore } from "@create-store";

export interface StoreTodo {
  title: string;
  id: string;
  completed: boolean;
}

export interface StoreState {
  todos: StoreTodo[];
}

export const store = createStore({
  todos: []
} as StoreState);