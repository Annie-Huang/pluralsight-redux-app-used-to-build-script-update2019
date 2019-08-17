import { combineReducers } from "redux";
// The reason we can call "course" (from import 'courses') in below is because
// the courseReducer.js only got one "export default"
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
    courses,
    authors,
    apiCallsInProgress // Remember: when you create a new reducer, you need to reference it here in your root reducer.
});

export default rootReducer;
