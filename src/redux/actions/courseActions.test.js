import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";

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
