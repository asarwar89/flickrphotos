import React, { Component } from 'react';
import './App.css';

import UserInput from './components/UserInput/UserInput';
import FlickrPhotos from './components/FlickrPhotos/FlickrPhotos';

class App extends Component {
  state = {
    searchString: ''
  }

  switchSearchString = (event) => {
    this.setState({
      searchString: event.target.value
    });
  }

  render(){
    return (
      <div className="App">
        <UserInput changed={this.switchSearchString} searchString={this.state.searchString} />
        <FlickrPhotos searchString={this.state.searchString} />
      </div>
    )
  }
}

export default App;
