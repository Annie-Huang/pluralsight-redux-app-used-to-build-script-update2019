import React, {Component} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends Component {
    componentDidMount() {
        this.props.actions.loadCourses().catch(error => {
            alert("Loading courses failed" + error);
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

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createCourse: course => dispatch(courseActions.createCourse(course))
//     };
// }
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoursesPage);
