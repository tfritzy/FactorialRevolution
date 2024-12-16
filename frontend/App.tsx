import React from "react";
import GameContainer from "./game-container";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="w-[100vw] h-[100vh]">
        <GameContainer />
      </div>
    </Provider>
  );
}

export default App;
