import service from "..";

// 轮播图
export function getBanner(){
    return service({
        method: "GET",
        url: "/banner?type=0"
    })
}
// 发现好歌单
export function getMusicList(){
    return service({
        method: "GET",
        url: "/personalized?limit=18"
    })
}
// 发现好歌单
export function getSearchMusic(data){
    return service({
        method: "GET",
        url: `/search?keywords=${data}`
    })
}

