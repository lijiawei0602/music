import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/css/Music.less';
import Playlist from './Playlist';
import Main from './Main';
import Bar from '../components/Bar.js';
import { fetchCurrentSong, updateCurrentIndex, switchAudio } from '../actions/index';

class Music extends Component{
    constructor(props){
        super(props);
        this.changeLayout = this.changeLayout.bind(this);
        this.prevClick = this.prevClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(updateCurrentIndex(0));
    }

    componentWillReceiveProps(nextProps){
        const { dispatch } = this.props;
        if(nextProps.items.length !== this.props.items.length){
            let id = nextProps.items[0].id;
            dispatch(fetchCurrentSong(id));
        }

        if(nextProps.currentIndex !== this.props.currentIndex){
            let currentIndex = nextProps.currentIndex;
            let id = nextProps.items[currentIndex].id;
            dispatch(fetchCurrentSong(id));
        }

        if(nextProps.currentSong && this.props.currentSong){
            if(nextProps.currentSong.image !== this.props.currentSong.image)
                this.refs.bg.style.backgroundImage = `url(${nextProps.currentSong.image})`;
        }
        
        if(nextProps.currentSong && this.props.currentSong){
            if(nextProps.currentSong.url !== this.props.currentSong.url){
                dispatch(switchAudio("play"));
            }
        }
    }

    changeLayout(state){
        if(state){
            this.refs.left.style.display = "none";
            this.refs.right.style.width = "100%";
        }else{
            this.refs.left.style.display = "block";
            this.refs.right.style.width = "300px";
        }
    }

    prevClick(){
        const { dispatch } = this.props;
        dispatch(switchAudio("pause"));
        let currentIndex = this.props.currentIndex;
        if(currentIndex === 0){
            dispatch(updateCurrentIndex(this.props.items.length - 1));
        }else{
            dispatch(updateCurrentIndex(currentIndex - 1));
        }
    }

    nextClick(){
        const { dispatch } = this.props;
        dispatch(switchAudio("pause"));
        let currentIndex = this.props.currentIndex;
        if(currentIndex === this.props.items.length - 1){
            dispatch(updateCurrentIndex(0));
        }else{
            dispatch(updateCurrentIndex(currentIndex + 1));
        }
    }

    render(){
        return(
            <div className="Music">
                <div className="Music-content">
                    <div className="Music-left" ref="left">
                        <div className="Music-nav">
                            <div className="Music-nav-btn on">正在播放</div>
                            <div className="Music-nav-btn">排行榜</div>
                            <div className="Music-nav-btn">搜索</div>
                            <div className="Music-nav-btn">我的歌单</div>
                            <div className="Music-nav-btn">我听过的</div>
                        </div>
                        <div className="Music-main">
                            <Playlist></Playlist>
                        </div>
                    </div>
                    <div className="Music-right" ref="right">
                        <Main currentSong={this.props.currentSong} changeLayout={this.changeLayout}></Main>
                    </div>
                </div>
                <div className="Music-bar">
                    <Bar currentSong={this.props.currentSong} currentTime={this.props.currentTime} audioState={this.props.audioState} updateCurrentTime={this.props.updateCurrentTime} updateVolume={this.props.updateVolume} prevClick={this.prevClick} nextClick={this.nextClick}></Bar>
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
        items: state.playlist.items,
        currentIndex: state.currentSong.currentIndex,
        audioState: state.currentSong.audioState
    }
}

export default connect(mapStateToProps)(Music);