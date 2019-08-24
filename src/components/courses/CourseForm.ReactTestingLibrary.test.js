import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";
import {shallow} from "enzyme/build";

// With React Testing Library, there is no shallow rendering. Component are always mounted.
// https://testing-library.com/docs/dom-testing-library/api-queries

function renderCourseForm(args) {
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    const props = { ...defaultProps, ...args };
    // Enzyme version:
    // return shallow(<CourseForm {...props} />);
    // ReactTestingLibrary version:
    return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
    const { getByText } = renderCourseForm();
    //  The getByText function has an assertion built in, so if it doesn't find the text that we pass, then it will fail.
    getByText("Add Course"); // Note that I don't have to call expect
});

it('should label save button as "Save" when not saving', () => {
    const { getByText } = renderCourseForm();
    getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
    const { getByText } = renderCourseForm({ saving: true });
    // const { getByText, debug } = renderCourseForm({ saving: true });
    // debug();
    getByText("Saving...");
});
