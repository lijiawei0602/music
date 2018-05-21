import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestPlaylist, switchAudio, updateCurrentIndex } from '../actions/index.js';
import '../assets/css/Playlist.less';
import List from '../components/List.js';

class Playlist extends Component{
    constructor(props){
        super(props);
        this.getCurrentSong = this.getCurrentSong.bind(this);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(requestPlaylist());
    }

    getCurrentSong(index){
        const { dispatch } = this.props;
        if(this.props.currentIndex === index){
            if(this.props.audioState === "play"){
                dispatch(switchAudio("pause"));
            }else{
                dispatch(switchAudio("play"));
            }
        }else{
            dispatch(updateCurrentIndex(index));
        }
    }

    render(){
        return(
            <div className="Playlist">
                <div className="Playlist-head list-item">
                    <span className="Playlist-name">歌曲</span>
                    <span className="Playlist-author">歌手</span>
                    <span className="Playlist-time">时长</span>
                </div>
                <div className="Playlist-content">
                    <List items={this.props.items} currentIndex={this.props.currentIndex} audioState={this.props.audioState} getCurrentSong={this.getCurrentSong}></List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.playlist.items,
        currentIndex: state.currentSong.currentIndex,
        audioState: state.currentSong.audioState
    }
}

export default connect(mapStateToProps)(Playlist);