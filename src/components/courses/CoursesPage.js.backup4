import React, {Component} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends Component {
    componentDidMount() {
        this.props.actions.loadCourses().catch(error => {
            alert("Loading courses failed" + error);
        });

        this.props.actions.loadAuthors().catch(error => {
            alert("Loading authors failed" + error);
        });
    }

// {this.props.courses.map(course => (
// <div key={course.title}>{course.title}</div>
// ))}
    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </>
        );
    }
}

// CoursesPage.propTypes = {
//     courses: PropTypes.array.isRequired,
//     createCourse: PropTypes.func.isRequired
// };
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//     return {
//         courses: state.courses
//     };
// }
function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0 // safety check.
                ? []
                : state.courses.map(course => {
                    return {
                        ...course,
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    };
                }),
        authors: state.authors
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createCourse: course => dispatch(courseActions.createCourse(course))
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(courseActions, dispatch)
//     };
// }
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoursesPage);
