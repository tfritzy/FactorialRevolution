import React from "react";
import GameContainer from "./game-container";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="w-screen h-screen">
        <GameContainer />
      </div>
    </Provider>
  );
}

export default App;
