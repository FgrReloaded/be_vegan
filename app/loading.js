import React from 'react'


import { Ysabeau } from "next/font/google"
const ysabeau = Ysabeau({ subsets: ["latin"] })
const loading = () => {

  return (
    <>
      <h1 style={ysabeau.style} className='cookingin'>Cooking in progress..</h1>
      <div id="cooking">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
    </>

  )
}

export default loading