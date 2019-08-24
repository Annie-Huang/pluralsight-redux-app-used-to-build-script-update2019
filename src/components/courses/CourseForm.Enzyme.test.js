import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

// Two ways to render a React component for testing with Enzyme:
// 1. shallow - Renders single component
// 2. mount - Renders component with children

// With shallow:
// - No DOM is created
// - No child components are rendered.

// This will keep our tests simple
function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    const props = { ...defaultProps, ...args };
    return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
    const wrapper = renderCourseForm();
    // console.log(wrapper.debug());
    expect(wrapper.find("form").length).toBe(1);
    // Enzyme's find function accepts CSS selectors.
    // Example:
    // ID: find('#firstname')
    // Class: find('.wrapper')
    // Tag: find('h1')
    expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it('labels save buttons as "Save" when not saving', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
    const wrapper = renderCourseForm({ saving: true });
    expect(wrapper.find("button").text()).toBe("Saving...");
});
