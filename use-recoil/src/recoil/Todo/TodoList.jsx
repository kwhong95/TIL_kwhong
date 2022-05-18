import { useRecoilValue } from "recoil";
import { TodoItem } from "./TodoItem";
import { todoListState } from "./TodoStore";
import TodoItemCreator from "./TodoItemCreator";

export const TodoList = () => {
  const todoList = useRecoilValue(todoListState);

  return (
    <div>
      <TodoItemCreator />
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </div>
  );
};
