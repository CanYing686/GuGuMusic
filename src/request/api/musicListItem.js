import service from "..";

// 获取歌单详情数据
export function getMusicItemList(data){
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}
// 获取歌单歌曲
export function getItemList(data){
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${data}&limit=99&offset=0`
    })
}

export function getMusicLyric(data){
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`
    })
}
