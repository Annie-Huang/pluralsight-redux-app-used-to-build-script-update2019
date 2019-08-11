import React from "react";
import {Route} from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";

const App = () => {
    return (
        <div className="container-fluid">
            <Header />
            <Route exact path="/" component={HomePage} /> {/*React Router will watch the URL and render the proper route. Our Header will always display above*/}
            <Route path="/about" component={AboutPage} />
        </div>
    );
};

export default App;
