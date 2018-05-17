import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../assets/img/logo.svg';
import '../assets/css/App.css';
import Music from './Music.js';
import { fetchMusicUrl, updateCurrentTime } from '../actions/index.js';


class App extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
    if(nextProps.currentSong){
      const id = nextProps.currentSong.id;
      dispatch(fetchMusicUrl(id));
    }
    if(nextProps.musicUrl !== this.props.musicUrl){
      this.refs.audio.src = nextProps.musicUrl;
    }
    if(nextProps.audioState){
      const audio = this.refs.audio;
      let currentTime;

      audio.addEventListener("timeupdate", function(){
        currentTime = audio.currentTime;
        dispatch(updateCurrentTime(currentTime));
      },false);

      if(nextProps.audioState === "play"){
        audio.play();
      }
      else{
        audio.pause();
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">在线音乐播放器</h1>
          <div className="App-login">登录</div>
        </header>
        <Music></Music>
        <audio ref="audio"></audio>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentSong: state.currentSong.currentSong,
    musicUrl: state.currentSong.musicUrl,
    audioState: state.currentSong.audioState
  }
}

export default connect(mapStateToProps)(App);
