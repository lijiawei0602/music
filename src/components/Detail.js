import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDetail, updateCurrentIndex, switchAudio } from '../actions/index';
import '../assets/css/Detail.less';
import List from '../components//List.js';

class Detail extends Component{
    constructor(props){
        super(props);
        this.getCurrentSong = this.getCurrentSong.bind(this);
    }
    componentDidMount(){
        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        dispatch(fetchDetail(id));
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
        if(!this.props.items){
            return null;    
        }
        return(
            <div className="Detail">
                <div className="Detail-head list-item">
                    <span className="Detail-name">歌曲</span>
                    <span className="Detail-author">歌手</span>
                    <span className="Detail-time">专辑</span>
                </div>
                <div className="Detail-content">
                    <List type={2} items={this.props.items} currentIndex={this.props.currentIndex} audioState={this.props.audioState} getCurrentSong={this.getCurrentSong}></List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.top.detail,
        currentIndex: state.currentSong.currentIndex,
        audioState: state.currentSong.audioState
    }
}

export default connect(mapStateToProps)(Detail);