import { RecoilRoot } from "recoil";
import FontButton from "./FontButton";
import Text from "./Text";
import CharacterCounter from "./CharactorCounter";
import { TodoList } from "./recoil/Todo/TodoList";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <FontButton />
        <Text />
        <CharacterCounter />
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
