import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/* Pages */
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Post from "./Components/Post/Post";
import EditPost from "./Components/EditPost/EditPost";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/post" component={Post} />
          <Route path="/edit/post/:id" component={EditPost} />
        </Switch>
      </Router>
    </>
  );
}
export default App;
