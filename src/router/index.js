import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Person from "../views/Person.vue";
import Login from "../views/Login.vue";

import GameList from "../views/GameList.vue";
import GameDetail from "../views/GameDetail.vue";
import NewsList from "../views/NewsList.vue";
import NewsDetail from "../views/NewsDetail.vue";
import ScoreSearch from "../views/ScoreSearch.vue";
import SearchList from "../views/SearchList.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/person",
    name: "Person",
    component: Person
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/GameList",
    name: "GameList",
    component: GameList
  },
  {
    path: "/GameDetail",
    name: "GameDetail",
    component: GameDetail
  },
  {
    path: "/NewsList",
    name: "NewsList",
    component: NewsList
  },
  {
    path: "/NewsDetail",
    name: "NewsDetail",
    component: NewsDetail
  },
  {
    path: "/ScoreSearch",
    name: "ScoreSearch",
    component: ScoreSearch
  },
  {
    path: "/SearchList",
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
