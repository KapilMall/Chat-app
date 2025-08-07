import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { appReducer } from "./appReducer";
import { chatReducer } from "./chatReducer";

export const rootReducer = combineReducers({
    userReducer,
    appReducer,
    chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;