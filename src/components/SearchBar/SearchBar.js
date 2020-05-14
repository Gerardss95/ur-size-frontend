import React, { Component } from 'react'

export default class SearchBar extends Component {
  search = (e) =>{
    this.props.searchQuery(e);
  }
  render(){
    const {searchPlaceHolder} = this.props;
    return(
      <div>
        <input placeholder={searchPlaceHolder} type="text" onChange={this.search}></input>
      </div>
    );

  }
}