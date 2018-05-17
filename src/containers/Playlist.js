import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestPlaylist } from '../actions/index.js';
import '../assets/css/Playlist.less';
import List from '../components/List.js';

class Playlist extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(requestPlaylist());
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
                    <List items={this.props.items} getCurrentSong={this.props.getCurrentSong}></List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.playlist.items
    }
}

export default connect(mapStateToProps)(Playlist);