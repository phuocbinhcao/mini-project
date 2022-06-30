import TaskReducer from "./Task";
import { combineReducers } from "redux"


const rootReducer = combineReducers({
    task: TaskReducer,
});

export default rootReducer;