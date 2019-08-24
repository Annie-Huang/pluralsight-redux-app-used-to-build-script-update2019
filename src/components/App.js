import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
// ESLint is making sure we want to import the default export (since the named export has the same name)
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <div className="container-fluid">
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} /> {/*React Router will watch the URL and render the proper route. Our Header will always display above*/}
                <Route path="/about" component={AboutPage} />
                <Route path="/courses" component={CoursesPage} />
                {/*The slug is a url friendly id. It's more readable. Since only one route in Switch can match, we need to declare this more specific route frist*/}
                <Route path="/course/:slug" component={ManageCoursePage} />
                <Route path="/course" component={ManageCoursePage} />
                <Route component={PageNotFound} />
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
        </div>
    );
};

export default App;
