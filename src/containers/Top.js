import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import '../assets/css/Top.less';
import { fetchTop, fetchPersonalized } from '../actions/index.js'; 
import logo from '../assets/img/logo.svg';
import { _throttle } from '../constants/util.js';

class Top extends Component{
    constructor(props){
        super(props);
        this.lazyload = this.lazyload.bind(this);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(fetchTop());
        dispatch(fetchPersonalized());
    }

    componentDidUpdate(){
        if(this.props.personal && this.props.toplist){
            this.lazyload();
            this.refs.top.onscroll = _throttle(this.lazyload);
        }
    }

    lazyload(e){
        let arr = this.refs.top.getElementsByTagName("img");
        let clientH = this.refs.top.clientHeight;
        let scrollTop = this.refs.top.scrollTop;
        let topOffsetTop = this.refs.top.offsetTop;
        for(let i=0; i<arr.length; i++){
            if(arr[i].offsetTop - topOffsetTop <= clientH + scrollTop + 80){
                arr[i].src = arr[i].getAttribute("data-src");
            }
        }   
    }


    render(){
        if(!this.props.toplist || !this.props.personal){
            return null;
        }
        return(
            <div className="Top" ref="top">
                <div className="Top-header">官方榜</div>
                <div className="Top-content">
                    {
                        this.props.toplist.map((item, index) => {
                            return (
                                <Link to={`top/detail/${item.id}`} key={index}>
                                    <div className="Top-item">
                                        <img src={logo} data-src={item.coverImgUrl} alt="" className="Top-item-img"/>
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
                                        <img src={logo} data-src={item.picUrl} alt="" className="Top-item-img"/>
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