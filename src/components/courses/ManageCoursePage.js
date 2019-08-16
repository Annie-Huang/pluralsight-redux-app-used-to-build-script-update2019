import React, {useEffect} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

// Hooks allow us to handle state and side effects (think lifecycle methods) in function components.
const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors }) => {
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
    }); // If you don't add the 2nd argument, the function will run every time the component is renders.

    return (
        <>
            <h2>Manage Course</h2>
        </>
    );
};

ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
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
