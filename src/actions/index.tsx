import { subscribe } from "@action";
import { store } from "@store";
import generateId from "@generate-id";

subscribe("TODO", ({ type, value }) => {
  switch (type) {
    case "ADD": {
      const todos = store.state.todos.slice();

      const todo = {
        id: generateId(),
        title: value.title,
        completed: false
      };

      todos.push(todo);
      store.setState({ todos });

      break;
    }

    case "COMPLETE": {
      const todos = store.state.todos.slice();
      const todo = todos.find(todo => todo.id === value.id);

      todo.completed = true;
      store.setState({ todos });

      break;
    }

    case "INCOMPLETE": {
      const todos = store.state.todos.slice();
      const todo = todos.find(todo => todo.id === value.id);

      todo.completed = false;

      store.setState({ todos });
    }
  }
});