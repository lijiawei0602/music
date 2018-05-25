import React, { Component } from 'react';
import { Connect } from 'react-redux';

import HotComment from '../components/HotComment.js';
import NewComment from '../components/NewComment.js';
import '../assets/css/Comment.less';

class Comment extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div className="Comment">
                <HotComment></HotComment>
                <NewComment></NewComment>
            </div>
        )
    }

}
 const mapStateToProps = (state, ownProps) => {
    return {
        ietms: state.currentSong.currentSong,
        currentIndex: state.currentSong.currentIndex,
        comment: state.currentSong.comment
    }
}

export default Comment;