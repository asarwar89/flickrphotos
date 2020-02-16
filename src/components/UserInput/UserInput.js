import React from 'react';

import classes from './UserInput.module.css';

const UserInput = (props) => {
 return (
   <div className={classes.UserInput}>
     <div className={classes.SearchBar}>
      <input className={classes.SearchInput} type="text" onChange={props.changed} value={props.searchString} placeholder="Search flickr Public Photos" />
      <i className={['material-icons',classes.SearchIcon].join(' ')}>search</i>
     </div>
   </div>
 )
};

export default UserInput;