import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import GameOverlay from "./game-overlay";
import { Game } from "../src/model/game";

function App(props: { game: Game }) {
  return (
    <Provider store={store}>
      <div className="fixed left-0 top-0 w-[100vw] h-[100vh] pointer-events-none">
        <GameOverlay game={props.game} />
      </div>
    </Provider>
  );
}

export default App;
