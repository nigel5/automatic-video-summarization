import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoSummary from "./pages/VideoSummary";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/v/:vid" exact component={VideoSummary}></Route>
                <Route path="/" exact component={Home}></Route>
            </BrowserRouter>
        );
    }
}
