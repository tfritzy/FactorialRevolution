import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setBuildingOrientation } from "./redux/store";
import { rotateSide, Side } from "../src/model/side";
import { Game } from "../src/model/game";
import {
  buildHeldBuilding,
  removePreviewBuilding,
} from "../src/op/build-building";

function refreshPreviewBuilding(game: Game, orientation: Side) {
  if (!game.previewBuliding) {
    return;
  }

  const pos = game.previewBuliding.pos;
  removePreviewBuilding(game);
  buildHeldBuilding(game, pos.y, pos.x, orientation, true);
}

const HotkeyListener = ({ game }: { game: Game }) => {
  const { buildingOrientation } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "q") {
        event.preventDefault();
        const newSide = rotateSide(buildingOrientation, -1);
        dispatch(setBuildingOrientation(newSide));
        refreshPreviewBuilding(game, newSide);
      }

      if (event.key === "e") {
        event.preventDefault();
        const newSide = rotateSide(buildingOrientation, 1);
        dispatch(setBuildingOrientation(newSide));
        refreshPreviewBuilding(game, newSide);
      }

      if (event.key === " ") {
        event.preventDefault();
        game.paused = !game.paused;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, buildingOrientation, game]);

  return null;
};

export default HotkeyListener;
