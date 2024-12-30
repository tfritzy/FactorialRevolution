import { configureStore, PayloadAction, Store } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../src/item/item-type";
import { Side } from "../../src/model/side";

type Menu = "crafting" | "inspector" | "shop" | undefined;

type MinimalItem = {
  type: ItemType;
  quantity: number;
};

interface UIState {
  openMenu: Menu;
  inspecting: string | undefined;
  heldItem: MinimalItem | undefined;
  buildingOrientation: Side;
}

const initialState: UIState = {
  openMenu: undefined,
  inspecting: undefined,
  heldItem: undefined,
  buildingOrientation: Side.North,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openInspector: (state, action: PayloadAction<string>) => {
      state.openMenu = "inspector";
      state.inspecting = action.payload;
    },
    viewShops: (state) => {
      state.openMenu = "shop";
    },
    closeShops: (state) => {
      state.openMenu = undefined;
    },
    closeInspector: (state) => {
      state.openMenu = undefined;
      state.inspecting = undefined;
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
    setBuildingOrientation: (state, action: PayloadAction<Side>) => {
      state.buildingOrientation = action.payload;
    },
  },
});

export function getState(store: Store): RootState {
  return store.getState();
}

export const {
  openInspector,
  toggleCrafting,
  setHeldItem,
  closeInspector,
  setBuildingOrientation,
  viewShops,
  closeShops,
} = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
