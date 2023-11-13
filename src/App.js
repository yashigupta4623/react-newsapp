import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoadingBar from 'react-top-loading-bar';

import React, { Component } from 'react';

export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_APIKEY

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height = {4}
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route path='/'>
              <News
                setProgress={this.setProgress} // Corrected function call
                key='general'
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                category='general'
                country='in'
              />
            </Route>
            <Route exact path='/business'>
              <News
                setProgress={this.setProgress} // Corrected function call
                key='business'
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                category='business'
                country='in'
              />
            </Route>
            <Route exact path='/entertainment'>
              <News
                setProgress={this.setProgress} // Corrected function call
                key='entertainment'
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                category='entertainment' // Corrected category spelling
                country='in'
              />
            </Route>
            <Route exact path='/health'>
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey} // Corrected function call
                key='health'
                pageSize={this.pageSize}
                category='health'
                country='in'
              />
            </Route>
            <Route exact path='/science'>
              <News
                setProgress={this.setProgress} // Corrected function call
                pageSize={this.pageSize}
apiKey = {this.apiKey}
                key='science'
                category='science'
                country='in'
              />
            </Route>
            <Route exact path='/technology'>
              <News
                setProgress={this.setProgress} // Corrected function call
                pageSize={this.pageSize}
                apiKey = {this.apiKey}
                key='technology'
                category='technology'
                country='in'
              />
            </Route>
            <Route exact path='/sports'>
              <News
                setProgress={this.setProgress} // Corrected function call
                pageSize={this.pageSize}
                apiKey={this.apiKey}
                key='sports'
                category='sports' // Corrected category spelling
                country='in'
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

