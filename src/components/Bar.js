import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/css/Bar.less';
import { switchAudio } from '../actions/index';

class Bar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPlay: false
        }
        this.switchAudio = this.switchAudio.bind(this);
        this.barClick = this.barClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const dotWidth = 10;
        if(nextProps.currentSong.duration && nextProps.currentTime){
            let percent = this.filterTime(nextProps.currentTime) / this.filterTime(nextProps.currentSong.duration);
            let allWidth = this.refs.prog.clientWidth - dotWidth;
            let progWidth = percent * allWidth;
            this.moveTo(progWidth);
        }
    }

    moveTo(progWidth){
        this.refs.progInner.style.width = progWidth + "px";
        this.refs.progDot.style.left = progWidth + "px";
    
    }

    barClick(e){
        const dotWidth = 10;
        let rect = this.refs.prog.getBoundingClientRect();
        let offset = Math.min(this.refs.prog.clientWidth-dotWidth, Math.max(0, e.clientX-rect.left-5));
        this.moveTo(offset);
    }
    
    switchAudio(){
        const { dispatch } = this.props;
        if(this.state.isPlay === false){
            dispatch(switchAudio("play"));
            this.setState({
                isPlay: !this.state.isPlay
            })
        }else{
            dispatch(switchAudio("pause"));
            this.setState({
                isPlay: !this.state.isPlay
            })
        }
    }

    filterTime(time){
        let t = time.split(":");
        return Number(Number(t[0]) * 60  + Number(t[1]));
    }

    render(){
        if(!this.props.currentSong){
            return null;
        }
        return (
            <div className="Bar">
                <div className="Bar-btn">
                    <i className="Bar-btn-icon btn-pre" title="上一曲"></i>
                    <i className={ this.state.isPlay? 'Bar-btn-icon btn-pause': 'Bar-btn-icon btn-play' } title="播放暂停" onClick={this.switchAudio}></i>
                    <i className="Bar-btn-icon btn-next" title="下一曲"></i>
                </div>
                <div className="Bar-music">
                    <div className="Bar-music-info">{this.props.currentSong.name} - {this.props.currentSong.author}</div>
                    <div className="Bar-music-time">{this.props.currentTime || '00:00'}/{this.props.currentSong.duration}</div>
                    <div className="Bar-music-prog" ref="prog" onClick={this.barClick}>
                        <div className="prog-outer"></div>
                        <div className="prog-inner" ref="progInner">
                            <div className="prog-dot" ref="progDot"></div>
                        </div>
                    </div>
                </div>
                <div className="Bar-mode mode-order" title="顺序播放"></div>
                <div className="Bar-comment" title="评论"></div>
                <div className="Bar-volume" title="音量">
                    <i className="btn-volume"></i>
                    <div className="Bar-music-prog">
                        <div className="Bar-prog-outer"></div>
                        <div className="Bar-prog-inner">
                            <div className="Bar-prog-dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Bar);