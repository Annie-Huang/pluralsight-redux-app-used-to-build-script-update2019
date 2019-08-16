import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// export default function courseReducer(state = [], action) {
export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        // case types.CREATE_COURSE:
        case types.CREATE_COURSE_SUCCESS:
            return [...state, { ...action.course }];
        case types.UPDATE_COURSE_SUCCESS:
            return state.map(course =>
                // map returns a new array. I'm replacing the element with the matching course.id
                // With Redux, you'll often use the spread operator, map, filter, and reduce.
                course.id === action.course.id ? action.course : course
            );
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        default:
            return state;
    }
}
