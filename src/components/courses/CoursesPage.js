import React, {Component} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends Component {
    state = {
        redirectToAddCoursePage: false
    };

    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }

        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }

    // The user has to wait for the API call to complete before the UI reflects an add or edit
    // Let's do an optimistic delete. (update the UI immediately)
    handleDeleteCourse = async course => {
        toast.success("Course deleted");
        this.props.actions.deleteCourse(course);
    };

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <> {/* I needed to add the fragment wrapper here because jsx requires a single top-level element for each expression.
                           Prefer fragments over divs since fragments avoid creating needless element in the DOM.
                        */}
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() => this.setState({ redirectToAddCoursePage: true })}
                        >
                            Add Course
                        </button>
                        {/*<CourseList courses={this.props.courses} />*/}
                        <CourseList
                            onDeleteClick={this.handleDeleteCourse}
                            courses={this.props.courses}
                        />
                    </>
                )}
            </>
        );
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

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
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createCourse: course => dispatch(courseActions.createCourse(course))
//     };
// }
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoursesPage);
