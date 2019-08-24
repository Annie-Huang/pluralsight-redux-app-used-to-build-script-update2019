import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Goal: Assert it returns the expected object.

// This test confirms when I call the createCourseSuccess action creator, I get the expected object shape back.
describe("createCourseSuccess", () => {
    it("should create a CREATE_COURSE_SUCCESS action", () => {
        //arrange
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        };

        //act
        const action = courseActions.createCourseSuccess(course);

        //assert
        expect(action).toEqual(expectedAction);
    });
});

// Test an async action
// Create redux mock store.
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe("Load Courses Thunk", () => {
        // If you have multiple thunks, you can copy/paste this pattern to test them quickly.
        it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
            // This captures all fetch calls and responds with some mock data.
            fetchMock.mock("*", {
                body: courses,
                headers: { "content-type": "application/json" }
            });

            // Goal: Assert these actions are created.
            const expectedActions = [
                { type: types.BEGIN_API_CALL },
                { type: types.LOAD_COURSES_SUCCESS, courses }
            ];

            const store = mockStore({ courses: [] });
            return store.dispatch(courseActions.loadCourses()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
