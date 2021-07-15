//import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";

import Cover from "./components/cover";
import Inside from "./components/inside";
import Backcover from "./components/backCover";
import Footer from "./components/footer";

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <div className="main-div">
        {/* <h1>Hello JotDown</h1> */}
      
        <Switch>
          <Route exact path="/" component={Cover} />
          <Route exact path="/journal" component={Inside} />
          <Route exact path="/about" component={Backcover} />
        </Switch>

        <Footer />

        </div>
      </div>
    );
  }
}

export default App;
