import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 内容需要居中的页面
export const layoutCenterNames = ["discovery", "playlists", "songs", "mvs"];

// 侧边栏菜单的页面
export const menuRoutes: Array<RouteRecordRaw> = [
  {
    path: "/discovery",
    name: "discovery",
    component: () => import("@/views/discovery/index.vue"),
    meta: {
      title: "发现音乐",
      icon: "music"
    }
  },
  {
    path: "/playlists",
    name: "playlists",
    component: () => import("@/views/playlists/index.vue"),
    meta: {
      title: "推荐歌单",
      icon: "playlist-menu"
    },
    children: [
      {
        path: "/playlists/detail/:id",
        name: "playlistDetail",
        component: () => import("@/views/playlists/detail/index.vue")
      }
    ]
  },
  {
    path: "/songs",
    name: "songs",
    component: () => import("@/views/songs/index.vue"),
    meta: {
      title: "最新音乐",
      icon: "yinyue"
    }
  },
  {
    path: "/mvs",
    name: "mvs",
    component: () => import("@/views/mvs/index.vue"),
    meta: {
      title: "最新MV",
      icon: "mv"
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/discovery"
    },
    {
      path: "/search/:keywords",
      name: "search",
      component: () => import("@/views/search/index.vue"),
      props: true
      // children: [
      //   {
      //     path: "/",
      //     redirect: "songs"
      //   },
      //   {
      //     path: "songs",
      //     name: "searchSongs",
      //     component: SearchSongs
      //   },
      //   {
      //     path: "playlists",
      //     name: "searchPlaylists",
      //     component: SearchPlaylists
      //   },
      //   {
      //     path: "mvs",
      //     name: "searchMvs",
      //     component: SearchMvs
      //   }
      // ]
    },
    {
      path: "/mv/:id", // 这里的:id对应下面的route.params.id
      name: "mv",
      component: () => import("@/views/mvs/detail/index.vue"),
      props: route => ({ id: +route.params.id })
    },
    ...menuRoutes
  ]
});

export default router;
