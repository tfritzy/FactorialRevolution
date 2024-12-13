import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { V2 } from "../../src/numerics/v2";
import { ItemType } from "../../src/item/item-type";

type Menu = "crafting" | "inspector" | undefined;

type MinimalItem = {
  type: ItemType;
  quantity: number;
};

type MinimalV2 = {
  x: number;
  y: number;
};

interface UIState {
  openMenu: Menu;
  inspectingPos: MinimalV2 | undefined;
  heldItem: MinimalItem | undefined;
}

const initialState: UIState = {
  openMenu: undefined,
  inspectingPos: undefined,
  heldItem: undefined,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openInspector: (state, action: PayloadAction<V2>) => {
      state.openMenu = "inspector";
      state.inspectingPos = { x: action.payload.x, y: action.payload.y };
    },
    closeInspector: (state) => {
      state.openMenu = undefined;
      state.inspectingPos = undefined;
    },
    toggleCrafting: (state) => {
      if (state.openMenu === "crafting") {
        state.openMenu = undefined;
      } else {
        state.openMenu = "crafting";
      }
    },
    setHeldItem: (state, action: PayloadAction<MinimalItem | undefined>) => {
      state.heldItem = action.payload;
    },
  },
});

export const { openInspector, toggleCrafting, setHeldItem, closeInspector } =
  uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
