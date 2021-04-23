import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import user from "../views/User.vue";
import Login from "../views/Login.vue";
import GameList from "../views/GameList.vue";
import GameDetail from "../views/GameDetail.vue";
import NewsList from "../views/NewsList.vue";
import NewsDetail from "../views/NewsDetail.vue";
import ScoreSearch from "../views/ScoreSearch.vue";
import SearchList from "../views/SearchList.vue";
import MyGame from "../views/MyGame.vue";
import MyInfo from "../views/MyInfo.vue";
import MyCertificate from "../views/MyCertificate.vue";
import GameSignUp from "../views/GameSignUp.vue";
import Pay from "../views/Pay.vue";


Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Index",
        component: Index
    },
    {
        path: "/index",
        name: "Index",
        component: Index
    },
    {
        path: "/gameSignUp",
        name: "GameSignUp",
        component: GameSignUp
    },
    {
        path: "/pay",
        name: "Pay",
        component: Pay
    },
    {
        path: "/myGame",
        name: "MyGame",
        component: MyGame
    },
    {
        path: "/myInfo",
        name: "MyInfo",
        component: MyInfo
    },
    {
        path: "/myCertificate",
        name: "MyCertificate",
        component: MyCertificate
    },
    {
        path: "/user",
        name: "user",
        component: user
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/gameList",
        name: "GameList",
        component: GameList
    },
    {
        path: "/gameDetail",
        name: "GameDetail",
        component: GameDetail
    },
    {
        path: "/newsList",
        name: "NewsList",
        component: NewsList
    },
    {
        path: "/newsDetail",
        name: "NewsDetail",
        component: NewsDetail
    },
    {
        path: "/scoreSearch",
        name: "ScoreSearch",
        component: ScoreSearch
    },
    {
        path: "/searchList",
        name: "SearchList",
        component: SearchList
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;