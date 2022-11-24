import axios from "axios";

let service = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})
// let service = axios.create({
//     baseURL: "http://121.37.162.168:3000/",
//     timeout: 3000
// })

export default service;

