//解析歌词字符串
export function parseLyric(lyric){
    let lyrics = lyric.split("\n");
    let lyrArr = [];
    for(let i=0; i<lyrics.length; i++){
        let item = decodeURIComponent(lyrics[i]);
        let timeReg = /\[\d*:\d*(\.)\d*\]/g;
        let timeRegExp = item.match(timeReg);
        if(!timeRegExp)
            continue;
        let text = item.replace(timeReg, "");
        for(let m=0, n=timeRegExp.length; m<n; m++){
            let t = timeRegExp[m];
            let min = Number(String(t.match(/\[\d*/i)).slice(1));
            let sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            if(text !== ""){
                lyrArr.push({
                    time,
                    text
                });
            }        
        }
    }
    return lyrArr;
}