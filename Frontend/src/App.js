import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VideoPlayerPage from "./components/VideoPlayerPage";

const App = () => {
  return (
    <>
      <React.StrictMode>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/video" component={VideoPlayerPage} />
          </Switch>
        </div>
      </React.StrictMode>
    </>
  );
};

export default App;
