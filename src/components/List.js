import React, { Component } from 'react';

import '../assets/css/List.less';

class List extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="List">
                {
                    this.props.items.map((item,index) => {
                        return (
                            <div key={index} className={this.props.currentIndex === index && this.props.audioState === "play"? "List-main on" : "List-main"}>
                                <span className="List-index">{ index+1 }</span>
                                <div className="List-name">
                                    { item.name }
                                    <div className="List-menu">
                                        <span className="List-menu-play" className={this.props.currentIndex === index && this.props.audioState === "play"? 'List-menu-play':'List-menu-pause'} onClick={() => {this.props.getCurrentSong(index)}}></span>
                                    </div>
                                </div>
                                <span className="List-author">{ item.author }</span>
                                {
                                    this.props.type === 1
                                    ?
                                    <span className="List-time">
                                        <span>{ item.duration }</span>
                                        <i className="List-menu-del" onClick={() => {this.props.updatePlayList(index)}}></i>
                                    </span>
                                    :
                                    <span className="List-album">
                                        {item.album}
                                    </span>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default List;