import service from "..";

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