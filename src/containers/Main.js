import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/css/Main.less';
import Info from '../components/Info.js';
import Lyric from '../components/Lyric.js';
import { fetchLyric } from '../actions';


class Main extends Component{
    constructor(porps){
        super(porps);
    }
    
    componentWillReceiveProps(nextProps){
        const { dispatch } = this.props;
        const id = nextProps.currentSong.id;
        dispatch(fetchLyric(id));
    }

    render(){
        return (
            <div className="Main">
                <Info currentSong={this.props.currentSong}></Info> 
                <Lyric currentSong={this.props.currentSong} lyric={this.props.lyric}></Lyric>
            </div> 
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lyric: state.Main.lyric,
    }
}

export default connect(mapStateToProps)(Main);