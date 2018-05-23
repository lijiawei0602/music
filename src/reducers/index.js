import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as types from '../constants/actionTypes.js';

const initialState = {
    items: [],
};

function playlist(state=initialState, action){
    switch(action.type){
        case types.RECEIVE_PLAYLIST:
            return Object.assign({}, state, {items: action.items});
        case types.UPDATE_PLAYLIST:
            return Object.assign({}, state, {items: action.items});
        default:
            return state;
    }
}

function Main(state={ lyric: '' }, action){
    switch(action.type){
        case types.RECEIVE_LYRIC:
            return Object.assign({}, state, { lyric: action.lyric });
        default:
            return state;
    }
}

function currentSong(state={currentIndex: 0, audioState: "pause", audioMode: "order"}, action){
    switch(action.type){
        case types.RECEIVE_CURRENTSONG:
            return Object.assign({}, state, {currentSong: action.currentSong});
        case types.RECEIVE_MUSICURL:
            return Object.assign({}, state, {musicUrl: action.musicUrl});
        case types.SWITCH_AUDIO:
            return Object.assign({}, state, {audioState: action.audioState});
        case types.UPDATE_CURRENTTIME:
            return Object.assign({}, state, {currentTime: action.currentTime});
        case types.UPDATE_CURRENTINDEX:
            return Object.assign({}, state, {currentIndex: action.currentIndex});
        case types.SWITCH_AUDIOMODE:
            return Object.assign({}, state, {audioMode: action.mode});
        default:
            return state;
    }
}

export default combineReducers({
    playlist,
    Main,
    currentSong,
	routing:routerReducer
});