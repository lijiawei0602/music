// import fetch from 'isomorphic-fetch';
import axios from 'axios';

const URL = `http://localhost:3300`;

//排行榜歌曲
export function topList(idx){  
    const url = `${URL}/top/list?idx=${idx}`;
    return axios(url);
}
//歌词
export function lyric(id){
    const url = `${URL}/lyric?id=${id}`;
    return axios(url);
}
//歌曲详情
export function getSongById(id){
    const url = `${URL}/song/detail?ids=${id}`;
    return axios(url);
}
//获取音乐url
export function getMusicUrl(id){
    const url = `${URL}/music/url?id=${id}`;
    return axios(url);
}
//获取音乐评论
export function getMusicComment(id,limit=20,offset=0){
    const url= `${URL}/comment/music?id=${id}&limit=${limit}&offset=${offset}`;
    return axios(url);
}

//获取榜单
export function getTop(){
    const url = `${URL}/toplist/detail`;
    return axios(url);
}

//获取推荐歌单
export function getPersonalized(){
    const url = `${URL}/personalized`;
    return axios(url);
}

//获取歌单详情
export function getDetail(id){
    const url = `${URL}/playlist/detail?id=${id}`;
    return axios(url);
}

export function getSong(id){
    const url = `${URL}/song/detail?ids=${id}`;
    return axios(url);
}