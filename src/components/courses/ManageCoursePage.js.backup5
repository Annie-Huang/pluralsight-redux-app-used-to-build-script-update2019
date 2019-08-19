import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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
    // We're going to use local state because only this component and its child uses this data.
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        } else {
            setCourse({ ...props.course });
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    // Let's add client-side validation so users get validation feedback immediately.
    // Tips: If your API is built in Node, you can share your validation logic on client and server via npm!
    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};

        // This the same as validateCourse in apiServer.js
        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course saved.");
            history.push("/courses");
        }).catch(error => {
            setSaving(false); // this way the user can try submitting the form again after an error occurs.
            setErrors({ onSave: error.message });
        });
    }

    // We need to hide the form until we have the data.
    // If we use the same pattern as CoursePage.js, the form will immediately disappear when the user hits save. :(
    // Instead, let's disable the save button while the save is in progress.
    return authors.length === 0 || courses.length === 0 ? (
        <Spinner />
    ) : (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
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
    history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
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
