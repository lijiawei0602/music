import React, { Component } from 'react';

import '../assets/css/List.less';

class List extends Component{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            const item = nextProps.items[0];
            this.props.getCurrentSong(item);
        }
        
    }

    render(){
        return (
            <div className="List">
                {
                    this.props.items.map((item,index) => {
                        return (
                            <div key={index} className="List-main">
                                <span className="List-index">{ index+1 }</span>
                                <div className="List-name">
                                    { item.name }
                                    <div className="List-menu">
                                        <span className="List-menu-play"></span>
                                    </div>
                                </div>
                                <span className="List-author">{ item.author }</span>
                                <span className="List-time">
                                    <span>{ item.duration }</span>
                                    <i className="List-menu-del"></i>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default List;