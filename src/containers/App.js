import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/css/App.css';
import Music from './Music.js';


class App extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">在线音乐播放器</h1>
          <div className="App-login">登录</div>
        </header>
        {this.props.children}
        {/* <Music></Music> */}
      </div>
    );
  }
}

export default App;
