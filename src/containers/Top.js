import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import '../assets/css/Top.less';
import { fetchTop, fetchPersonalized } from '../actions/index.js'; 

class Top extends Component{

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(fetchTop());
        dispatch(fetchPersonalized());
    }


    render(){
        if(!this.props.toplist || !this.props.personal){
            return null;
        }
        return(
            <div className="Top">
                <div className="Top-header">官方榜</div>
                <div className="Top-content">
                    {
                        this.props.toplist.map((item, index) => {
                            return (
                                <Link to={`top/detail/${item.id}`} key={index}>
                                    <div className="Top-item">
                                        <img src={item.coverImgUrl} alt="" className="Top-item-img"/>
                                        <div className="Top-item-name">{item.name}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="Top-header">热门歌单</div>
                <div className="Top-content">
                    {
                        this.props.personal.map((item,index) => {
                            return (
                                <Link to={`top/detail/${item.id}`} key={index}>
                                    <div className="Top-item" key={index}>
                                        <img src={item.picUrl} alt="" className="Top-item-img"/>
                                        <div className="Top-item-name">{item.name}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        toplist: state.top.toplist,
        personal: state.top.personal
    }
}

export default connect(mapStateToProps)(Top);