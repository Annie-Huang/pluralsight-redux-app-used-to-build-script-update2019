import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Will get eslint error:
// myGlobal = 4;

function Hi() {
    // debugger;
    return <p>Hi.</p>;
}

render(
    <Router>
        <Hi/>
    </Router>,
    document.getElementById("app")
);
