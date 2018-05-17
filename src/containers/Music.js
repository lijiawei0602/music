import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/css/Music.less';
import Playlist from './Playlist';
import Main from './Main';
import Bar from '../components/Bar.js';
import { fetchCurrentSong } from '../actions/index';

class Music extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentSong: {}
        }
        this.getCurrentSong = this.getCurrentSong.bind(this);
    }

    getCurrentSong(item){
        this.setState({
            currentSong: item
        })
    }

    componentDidMount(){
        const {  dispatch } = this.props;
        dispatch(fetchCurrentSong());
    }

    componentWillReceiveProps(nextProps){
        this.refs.bg.style.backgroundImage = `url(${nextProps.currentSong.image})`;
    }

    render(){
        return(
            <div className="Music">
                <div className="Music-content">
                    <div className="Music-left">
                        <div className="Music-nav">
                            <div className="Music-nav-btn on">正在播放</div>
                            <div className="Music-nav-btn">排行榜</div>
                            <div className="Music-nav-btn">搜索</div>
                            <div className="Music-nav-btn">我的歌单</div>
                            <div className="Music-nav-btn">我听过的</div>
                        </div>
                        <div className="Music-main">
                            <Playlist getCurrentSong={this.getCurrentSong}></Playlist>
                        </div>
                    </div>
                    <div className="Music-right">
                        <Main currentSong={this.props.currentSong}></Main>
                    </div>
                </div>
                <div className="Music-bar">
                    <Bar currentSong={this.props.currentSong} currentTime={this.props.currentTime}></Bar>
                </div>
                <div className="Music-bg" ref="bg"></div>
                <div className="Music-mask"></div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentSong: state.currentSong.currentSong,
        currentTime: state.currentSong.currentTime,
    }
}

export default connect(mapStateToProps)(Music);