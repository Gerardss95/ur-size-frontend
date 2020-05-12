import React, { Component } from 'react';
import './ImgCarousel.css';

export default class ImgCarousel extends Component {
    
    state = {
        index: 0
    }

    handleClick = (direction) => () => {
        direction === "right" ? 
        this.setState(
            {index : this.state.index < this.props.imgs.length -1 ? this.state.index +1 : 0 }
        )
        : 
        this.setState(
            {index : this.state.index > 0 ? this.state.index -1 : this.props.imgs.length -1 }
        )
    }

    render() {
        return (
            <div className="carousel">

              <img onClick={this.handleClick("left")} src="/img/-right.png" className='arrow left-center rotateimg180' alt="arrow-left" ></img>
              <img src={this.props.imgs[this.state.index]} className="carousel-image" alt="carousel"/>
              <img onClick={this.handleClick("right")} src="/img/-right.png" className='arrow right-center' alt="arrow-right" ></img>       
            
            </div>
        );
    }
};
    