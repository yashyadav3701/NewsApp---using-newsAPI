import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize=5;
  // apiKey=process.env.API_KEY;
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Switch>
          <Route exact path="/"><News setprogress={this.setprogress} key="general" pageSize={this.pageSize} country='in' category='general'/></Route>
          <Route exact path="/business"><News setprogress={this.setprogress} key="business" pageSize={this.pageSize} country='in' category='business'/></Route>
          <Route exact path="/entertainment"><News setprogress={this.setprogress} key="entertainment" pageSize={this.pageSize} country='in' category='entertainment'/></Route>
          <Route exact path="/general"><News setprogress={this.setprogress} key="general" pageSize={this.pageSize} country='in' category='general'/></Route>
          <Route exact path="/health"><News setprogress={this.setprogress} key="health" pageSize={this.pageSize} country='in' category='health'/></Route>
          <Route exact path="/science"><News setprogress={this.setprogress} key="science" pageSize={this.pageSize} country='in' category='science'/></Route>
          <Route exact path="/sports"><News setprogress={this.setprogress} key="sports" pageSize={this.pageSize} country='in' category='sports'/></Route>
          <Route exact path="/technology"><News setprogress={this.setprogress} key="technology" pageSize={this.pageSize} country='in' category='technology'/></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

