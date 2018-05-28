import * as types from '../constants/actionTypes.js';
import * as api from '../api/index.js';

//接受Playlist
function receivePlaylist(json){
    return {
        type: types.RECEIVE_PLAYLIST,
        items: json
    }
}

//获取Playlist
export function requestPlaylist(){
    return dispatch => {
        api.topList(1).then(res => {
            let arr = res.data.playlist.tracks;
            return filterPlaylist(arr);
        }).then(json => {
            dispatch(receivePlaylist(json));
        }).catch(e => {
            console.log(e);
        })
    }
}

//接收歌词
function receiveLyric(lyric){
    return{
        type: types.RECEIVE_LYRIC,
        lyric
    }
}

//请求歌词
export function fetchLyric(id){
    return dispatch => {
        api.lyric(id).then(res => {
            const lyric = res.data.lrc.lyric;
            return lyric;
        }).then(lyric => {
            dispatch(receiveLyric(lyric));
        }).catch(e => {
            console.log(e);
        });
    };
}

//接收当前歌曲
function receiveCurrentSong(currentSong){
    return {
        type: types.RECEIVE_CURRENTSONG,
        currentSong
    }
}

//根据歌曲id获取当前歌曲
export function fetchCurrentSong(id=347230){
    return dispatch => {
        api.getSongById(id).then(res => {
            const currentSong = res.data.songs[0];
            return filterCurrentSong(currentSong);
        }).then(json => {
            return dispatch(receiveCurrentSong(json));
        }).catch(e => {
            console.log(e);
        });
    }
}

function receiveMusicUrl(musicUrl){
    return {
        type: types.RECEIVE_MUSICURL,
        musicUrl
    }
}

//获取music Url
export function fetchMusicUrl(id){
    return dispatch => {
        api.getMusicUrl(id).then(res => {
            return res.data.data[0].url;
        }).then(json => {
            dispatch(receiveMusicUrl(json));
        }).catch(e => {
            console.log(e);
        });
    }
}

//切换audio状态
export function switchAudio(state){
    return {
        type: types.SWITCH_AUDIO,
        audioState: state
    }
}

//更新currentTime
export function updateCurrentTime(time){
    return {
        type: types.UPDATE_CURRENTTIME,
        currentTime: filterCurrentTime(time)
    }
}

//更新currentIndex
export function updateCurrentIndex(index){
    return {
        type: types.UPDATE_CURRENTINDEX,
        currentIndex: index
    }
}

//删除playList
export function updatePlayList(items){
    return {
        type: types.UPDATE_PLAYLIST,
        items
    }
}

//切换audioMode
export function switchAudioMode(mode){
    return {
        type: types.SWITCH_AUDIOMODE,
        mode
    }
}

function receiveHotComment(comment){
    return {
        type: types.RECEIVE_HOTCOMMENT,
        comment
    }
}

function receiveNewComment(comment){
    return {
        type: types.RECEIVE_NEWCOMMENT,
        comment
    }
}

export function fetchComment(id, limit=20,offset=0){
    return dispatch => {
        api.getMusicComment(id,limit,offset).then(res => {
            return res.data;
        }).then(json => {
            dispatch(receiveHotComment(json.hotComments));
            dispatch(receiveNewComment(json.comments));
        }).catch(e => {
            console.log(e);
        });
    };
}

export function reFetchComment(id,limit=20,offset=0,hotComment,lastNewComment){
    return dispatch => {
        api.getMusicComment(id,limit,offset).then(res => {
            return res.data;
        }).then(json => {
            dispatch(receiveHotComment(hotComment));
            dispatch(receiveNewComment(lastNewComment.concat(json.comments)));
        }).catch(e => {
            console.log(e);
        });
    }
}










function filterPlaylist(json){
    let arr = [];
    json.forEach(item => {
        if(item.id){
            var foo = {
                id: item.id,
                name: item.name,
                author: item.ar.length>0 && filterSinger(item.ar),
                duration: filterDuration(item.dt),
                image: item.al.picUrl,
                url: `http://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                album: item.al.name
            }
            arr.push(foo);
        }
    });
    return arr;
}

function filterSinger(singers){
    let arr = [];
    singers.forEach(item => {
        arr.push(item.name);
    });
    return arr.join("/");
}

function filterDuration(time){
    let dt = time / 1000;
    let m = Math.floor(dt / 60);
    let s = Math.floor(dt % 60);
    return `${addZero(m)}:${addZero(s)}`;
}

function addZero(s){
    return s < 10 ? '0'+s : s;
}

function filterCurrentSong(item){
    var foo = {
        id: item.id,
        name: item.name,
        author: item.ar.length>0 && filterSinger(item.ar),
        duration: filterDuration(item.dt),
        image: item.al.picUrl,
        url: `http://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        album: item.al.name
    }
    return foo;
}

function filterCurrentTime(value){
    let minute = Math.floor(value / 60);
    let second = Math.floor(value % 60);
    return `${addZero(minute)}:${addZero(second)}`
}