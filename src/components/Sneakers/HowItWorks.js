import React, { Component } from 'react'


class HowItWorks extends Component {

  render(){
    return(
      <div className="m-4 p-4  bg-red-200 flex items-center flex-col">
        <h1 className="flex flex-row text-xl" >How does UR SIZE Algorithm works?</h1>
        <img className="h-32 w-auto pt-4 " src="https://i.ibb.co/jh0NMvK/UrSize5.png" alt="UrSize5" border="0"></img>
        <p className="pt-4 text-center">The prototype Algorithm collects all user data on different brands and study the pattern of size usage, so we can offer what we think is the best option for you</p>
      </div>
    )
  }
}
export default HowItWorks;
