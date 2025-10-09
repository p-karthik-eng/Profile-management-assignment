import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import type { ThunkMiddleware } from "redux-thunk"; 
import { composeWithDevTools } from "@redux-devtools/extension";
import profileReducer from "./profileSlice";
import type { ProfileAction } from "./profileSlice"; 


const rootReducer = combineReducers({
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


export const store = createStore(
  rootReducer,
  undefined, 
  composeWithDevTools(
    applyMiddleware(thunk as unknown as ThunkMiddleware<RootState, ProfileAction>)
  )
);

export type AppDispatch = typeof store.dispatch;
