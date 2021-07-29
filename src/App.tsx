//import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";

import Cover from "./components/cover";
import Inside from "./components/inside";
import Backcover from "./components/backCover";
import Footer from "./components/footer";
import AdminAccess from "./components/admin";

interface IProps { 
};
interface IState { 
  sessionToken: (string | null), 
  isAdmin: (boolean | null),
 
 };
class App extends React.Component <IProps, IState> {

  constructor(props) {
    super(props)
    this.state = {
      sessionToken: '',
      isAdmin: false
    };
  }

  //set session token if there is one
  componentDidMount() {
    if (localStorage.getItem('token')){
      this.setState({sessionToken: localStorage.getItem('token')})
    };
    console.log('checking for token', window.location.hostname);
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
    console.log(newToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ''});
  }

  
 


  render() {
    return (
      <div className="App">
        <div className="main-div">
        {/* <h1>Hello JotDown</h1> */}
      
        <Switch>
          <Route exact path="/" render={() => <Cover updateToken={this.updateToken} />} />
          <Route exact path="/journal" component={Inside} />
          <Route exact path="/about" component={Backcover} />
          <Route exact path="/admin" component={AdminAccess} />
        </Switch>

        <Footer clearToken={this.clearToken}/>

        </div>
      </div>
    );
  }
}

export default App;
