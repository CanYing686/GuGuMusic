import { Swipe, SwipeItem, Button,Popup } from "vant";

let plugin = [Swipe, SwipeItem, Button,Popup];

export default function getVant(app){
    plugin.forEach((item) => {
        return app.use(item);
    })
}