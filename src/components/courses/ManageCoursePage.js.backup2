import React, { useEffect, useState } from "react"; // The useState Hook allows use to add React state to function components.
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

// Hooks allow us to handle state and side effects (think lifecycle methods) in function components.
// const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors }) => {
// const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors, course: initialCourse }) => {
const ManageCoursePage = ({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    ...props  // Assign any props I haven't destructed on the left to a variable called props.
}) => {
    // Avoid using Redux for all state, Use pain React state for data only one few components uses. (such as form state)
    // To choose Redux vs local state, ask: "Who cares about this data?" If only a few closely related components use the data, prefer plain React state
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
    //}); // If you don't add the 2nd argument, the function will run every time the component is renders.
    }, []); // The empty array as a second arguement to effect means the effect will run once when the component mounts.

    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
        />
    );
};

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);
