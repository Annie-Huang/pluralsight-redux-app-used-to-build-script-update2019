import React, {Component} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";

class ManageCoursePage extends Component {
    componentDidMount() {
        // const { courses, authors, actions } = this.props;
        const { courses, authors, loadCourses, loadAuthors } = this.props;


        if (courses.length === 0) {
            // actions.loadCourses().catch(error => {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }

        if (authors.length === 0) {
            // actions.loadAuthors().catch(error => {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Manage Course</h2>
            </>
        );
    }
}

// ManageCoursePage.propTypes = {
//     authors: PropTypes.array.isRequired,
//     courses: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };
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

// function mapDispatchToProps(dispatch) {
//     return {
//         createCourse: course => dispatch(courseActions.createCourse(course))
//     };
// }
// If we delcare mapDispatchToProps as an object instead, each property will automatically be bound to dispatch.
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: {
//             loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//             loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
//         }
//     };
// }
const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);
