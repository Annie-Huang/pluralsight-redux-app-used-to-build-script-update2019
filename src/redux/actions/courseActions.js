import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";

// export function createCourse(course) {
//     return { type: types.CREATE_COURSE, course };
// }

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return function(dispatch) { // Redux thunk injects dispatch so we don't have to
        dispatch(beginApiCall()); // Be sure to include the parentheses so the function is invoked.
        return courseApi
            .getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function saveCourse(course) {
    //eslint-disable-next-line no-unused-vars
    return function(dispatch, getState) { // getState lets us access the Redux store data
        dispatch(beginApiCall());
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                throw error;
            });
    };
}
