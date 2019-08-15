import { combineReducers } from "redux";
// The reason we can call "course" (from import 'courses') in below is because
// the courseReducer.js only got one "export default"
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
    courses,
    authors
});

export default rootReducer;
