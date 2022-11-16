import {createStore} from 'vuex';

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
        detailShow: false
    },
    mutations: {
        updateIsBtnShow:function (state,value){
            state.isBtnShow = value;
        },
        updatePlayerList:function (state,value) {
            state.playList = value
            console.log(state.playList)
        },
        updatePlayLIndex:function (state,value) {
            state.playListIndex = value
        },
        updateDetailShow:function (state) {
            state.detailShow = !state.detailShow
        }
    },
    actions: {},
    modules: {}
});
