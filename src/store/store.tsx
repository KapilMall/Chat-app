import { createStore } from "redux";
import { rootReducer } from "../reducer/rootReducer";

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState> 