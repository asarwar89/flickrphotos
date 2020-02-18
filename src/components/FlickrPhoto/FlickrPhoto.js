import React, { Component } from 'react';

import './FlickrPhoto.css';

// const FlickrPhoto = (props) => {
class FlickrPhoto extends Component {

  state = {
    shortTagVisible: true
  }

  //function to swict between full and short tags
  switchTags = () => {
    this.setState({ shortTagVisible: (!this.state.shortTagVisible) })
  }

  render() {

    //Extract author name removing unwanted characters
    const author = this.props.author.indexOf('nobody@flickr.com') > -1 ? this.props.author.slice(this.props.author.indexOf('("')+2,this.props.author.indexOf('")')) : this.props.author;
    
    //Output dates in Month Date Year format (ie - February 15 2002)
    const datetaken = (date) => {
      const dateArr = this.props.datetaken.substr(0,10).split('-');
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      return months[dateArr[1]-1] + ' ' + dateArr[2] + ' ' + dateArr[0];
    }

    //Create short version of tags because some tags are super long.
    //Onclick full tags will be visible
    const tags = this.props.tags.length > 18 ? this.props.tags.substr(0,18) + '...' : this.props.tags;


    return (
      <div className="FlickrPhoto col-md-6 col-lg-3">
        <div className="PhotoInner">
          <div className="imgBlock">
            <a href={this.props.link} target="_blank" rel="noopener noreferrer">
              <img src={this.props.thumb} alt={this.props.title}/>
            </a>
          </div> 
          <p className="Author">{author}</p>
          <p className="DateTaken"><i>{datetaken(this.props.datetaken)}</i></p>
          <p className="Tags" onClick={this.switchTags}><span className="label">Tags:</span> <span>{this.state.shortTagVisible ? tags: this.props.tags}</span></p>
          <a href={this.props.link} target="_blank" rel="noopener noreferrer">View Image</a>
        </div>
      </div>
    )
  }
};

export default FlickrPhoto;