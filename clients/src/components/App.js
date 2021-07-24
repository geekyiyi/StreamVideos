import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamList from "./streams/StreamList";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import history from "../history";

const App = () => {
  return (
    <div>
      {/* use the customized Router with specified history instead of BrowserRouter */}
      <Router history={history}>
        <div>
          <Header />
          {/* Switch will only show one Route which match first */}
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/stream/new" exact component={StreamCreate} />
            {/* id is the url params inside match props */}
            <Route path="/stream/edit/:id" exact component={StreamEdit} />
            <Route path="/stream/delete/:id" exact component={StreamDelete} />
            <Route path="/stream/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
