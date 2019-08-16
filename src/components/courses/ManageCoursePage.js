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
        // This destructure avoids the event getting garbage collected so that it's available whthin the nested setCourse call back.
        const { name, value } = event.target;

        // I'm using the functional form of setState so I can safely set new state that's based on the existing state.
        setCourse(prevCourse => ({
            ...prevCourse,
            // the following is Javascript computed property syntax. It allows us to reference a property via a variable.
            // So for example, if the input that just changed was the title field, this code is equivalent to saying course.title. Quite handy. And this approach is also outlined in the React docs.
            // The following is as: if course.name === "authorId", then call parseInt to convert that value to a number, otherwise I use the value that was passed in on the event directly.
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
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
