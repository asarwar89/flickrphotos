import React, { Component } from 'react';
import axios from 'axios'; 

import FlickrPhoto from '../FlickrPhoto/FlickrPhoto';
import classes from './FlickrPhotos.module.css';

class FlickrPhotos extends Component {

  state = {
    loadedSearchResult: null,
    propSearchString: null,
    isResult: null
  }

  //Front-end apps api request is blocked by CORS policy in browsers
  //So used cors-anywhere app to get "Access-Control-Allow-Origin: *"
  componentDidUpdate () {
    if (this.props.searchString !== '') {
      if (!this.state.loadedSearchResult || 
        (this.state.loadedSearchResult && this.state.propSearchString !== this.props.searchString)) {
        const propLocalSearchString = this.props.searchString;
          axios.get('https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/feeds/photos_public.gne?tags=' + this.props.searchString.replace(' ',',') + '&format=json&nojsoncallback=1')
              .then(response => {
                  this.setState({loadedSearchResult: response.data.items, propSearchString:propLocalSearchString});
              });
      }
    } else {
      if (this.state.propSearchString !== this.props.searchString) {
        this.setState({loadedSearchResult: null, propSearchString:''});
      }
    }
  }

  render() {

    let flkrPhotos;

    //Checks if there is results in api
    //Loading puts loading message
    //No Results puts update search string message
    if (this.state.loadedSearchResult) {
      if (this.state.loadedSearchResult.length > 0) {
        flkrPhotos = this.state.loadedSearchResult.map( photo => {
          return <FlickrPhoto
                      key={photo.link} 
                      link={photo.link}
                      title={photo.title}
                      thumb={photo.media.m} 
                      author={photo.author}
                      datetaken={photo.date_taken}
                      tags={photo.tags}/>
        });
      } else {
        flkrPhotos = <p className={classes.Text}>Sorry, there is no matching photos. Please try again.</p>
      }
    } else if (this.props.searchString.length > 0 && this.state.loadedSearchResult === null) {
      flkrPhotos = <p className={classes.Text}>Loading images!</p>
    } 

    return (
      <div className={[classes.FlickrPhotos, 'row', 'row-eq-height'].join(' ')}>
        {flkrPhotos}
      </div>
    )
  };
}

export default FlickrPhotos;