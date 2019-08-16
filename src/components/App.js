import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";

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
        </div>
    );
};

export default App;
