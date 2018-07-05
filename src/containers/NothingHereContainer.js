import React, { Component } from 'react';
import '../App.css';
import HeaderLogo from "../components/HeaderLogo";

const NothingHereContainer = function () {

  return (
      <div id="content-wrap">

        <div className="row">

          <HeaderLogo />

          <div style={{ width:'100%', textAlign:'center', textHeight:'800'}}>Oops: 404 - This content does not exist anymore is unavailable</div>

        </div>

      </div>
  );

}

export default NothingHereContainer;
