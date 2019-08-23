import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
// Note how we're able to use the same mock data for both the mock API and our tests. Handy.
import { courses, authors } from "../../../tools/mockData";

// Snapshots protect from making accidental changes to component output
// Name snapshots well, so other developers are clear what the expected output is

// Goal: Let's assure the label on the save button is properly set when we set the save prop to true.
it("sets submit button label 'Saving...' when saving is true", () => {
    // jest.fn() creates an empty mock function
    // with Boolean props, the existence of the prop infers truth, so I don't have to explicitly type = true here.
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving
        />
    );

    expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving={false}
        />
    );

    expect(tree).toMatchSnapshot();
});
