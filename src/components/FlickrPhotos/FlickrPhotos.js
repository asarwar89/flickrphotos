import React, { Component } from 'react';
import axios from 'axios'; 

import FlickrPhoto from '../FlickrPhoto/FlickrPhoto';
import classes from './FlickrPhotos.module.css';

class FlickrPhotos extends Component {

  // state = {
  //   loadedSearchResult: null,
  //   propSearchString: null,
  //   isResult: null
  // }

  constructor(){
    super();
    this.state = {
      loadedSearchResult: null,
      propSearchString: null,
      isResult: null
    }
    this.timeout = null;
  }

  //Front-end apps api request is blocked by CORS policy in browsers
  //So used cors-anywhere app to get "Access-Control-Allow-Origin: *"
  componentDidUpdate () {

    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {

      if (this.props.searchString !== '') {
        if (!this.state.loadedSearchResult || 
          (this.state.loadedSearchResult && this.state.propSearchString !== this.props.searchString)) {
          const propLocalSearchString = this.props.searchString;
            axios.get('https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/feeds/photos_public.gne?tags=' + this.props.searchString.split(' ').join(',') + '&format=json&nojsoncallback=1')
                .then(response => {
                    this.setState({loadedSearchResult: response.data.items, propSearchString:propLocalSearchString});
                });
        }
      } else {
        if (this.state.propSearchString !== this.props.searchString) {
          this.setState({loadedSearchResult: null, propSearchString:''});
        }
      }

    },1000)

  }

  render() {

    let flkrPhotos;

    //Checks if there is results in api
    //Loading puts loading message
    //No Results puts update search string message
    if (this.state.loadedSearchResult) {
      if (this.state.loadedSearchResult.length > 0) {

        //creating array of FlickrPhoto component for each photos in api
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
        //if loadedSearchResult is not null and length is 0
        //means no matching result for current search
        flkrPhotos = <p className={classes.Text}>Sorry, there are no matching photos. Please try again.</p>
      }
    } else if (this.props.searchString.length > 0 && this.state.loadedSearchResult === null) {
      //searchString is not null but loadedSearchResult is null, means still loading
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