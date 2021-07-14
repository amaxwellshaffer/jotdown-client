//import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";

import Cover from "./components/cover";
import Inside from "./components/inside";
class App extends React.Component {


  render() {
    return (
      <div className="App">
        <div className="main-div">
        {/* <h1>Hello JotDown</h1> */}
      
        <Switch>
          <Route exact path="/" component={Cover} />
          <Route exact path="/journal" component={Inside} />
        </Switch>

        </div>
      </div>
    );
  }
}

export default App;
