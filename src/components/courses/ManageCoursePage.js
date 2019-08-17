import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

const ManageCoursePage = ({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props
}) => {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    function handleSave(event) {
        event.preventDefault();
        saveCourse(course).then(() => {
            // This time let's use React Router's history object to redirect.
            // So you can use <Redirect> or history to redirect.
            history.push("/courses");
        });
    }

    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
        />
    );
};

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired // Any component loaded via <Route> gets "history" passed in on props from React Router.
};

// function like this is called a selector. It selects data from the Redux store.
// You could declare this in the course reducer for easy reuse.
// For performance you could memoize using reselect
// Read selector section in the redux docs.
export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

// ownProps: This lets us access the component's props. We can use this to read the URL data injected on props by React Router
const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0 // mapStateToProps runs every time the Redux store changes. So when courses are available, we'll call getCourseBySlug.
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
        // course: newCourse, // Goal: Populate the course object based on the URL
        course,
        courses: state.courses,
        authors: state.authors
    }
};

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);
