import {createStore} from 'vuex';
import {getMusicLyric} from "@/request/api/musicListItem";
import {getPhoneLogin} from "@/request/api/home";

export default createStore({
    state: {
        playList: [{
            al: {
                id: 3177160,
                name: "We Are Young & Free",
                pic: 109951167557295220,
                picUrl:
                    "https://p1.music.126.net/ROu52DfZhbUtYQTt_X8vpg==/109951167557295220.jpg",
                pic_str: "109951167557295220",
            },
            ar: {
                name: "史蒂夫"
            },
            id: 33051313,
        }],
        playListIndex: 0,
        isBtnShow: true,
        detailShow: false,
        lyricList: {},
        currentTime: 0, //当前时间
        duration: 0,
        token: "",
        cookie: "",
        vip: 0
    },
    mutations: {
        updateIsBtnShow: function (state, value) {
            state.isBtnShow = value;
        },
        updatePlayerList: function (state, value) {
            state.playList = value
            console.log(state.playList)
        },
        updatePlayLIndex: function (state, value) {
            state.playListIndex = value
        },
        updateDetailShow: function (state) {
            state.detailShow = !state.detailShow
        },
        updateLyricList: function (state, value) {
            state.lyricList = value;
        },
        updateCurrentTime: function (state, value) {
            state.currentTime = value;
        },
        updateDuration: function (state, value) {
            state.duration = value;
        },
        pushPlayList: function (state, value) {
            state.playList.push(value);
        },
        updateToken:function (state,value){
            state.token = value
            localStorage.setItem('token',state.token)
        },
        updateVipType:function (state,value){
            state.vip = value
            console.log(state.vip)
        }
    },
    actions: {
        getLyric: async function (context, value) {
            let res = await getMusicLyric(value)
            context.commit("updateLyricList", res.data.lrc);
        },

        getLogin:async function (context,value){
            return await getPhoneLogin(value)
        }
    },
    modules: {}
});
