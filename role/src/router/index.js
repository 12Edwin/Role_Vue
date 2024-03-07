import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue";
import Viewer from "@/views/Viewer.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import Editor from "@/views/Editor.vue";
import Admin from "@/views/Admin.vue";
import NotFound from "@/views/NotFound.vue";
import {jwtDecode} from "jwt-decode";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta:{ role: "admin"}
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
    meta:{ role: "editor"}
  },
  {
    path: '/viewer',
    name: 'viewer',
    component: Viewer,
    meta:{ role: "viewer"}
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'notFound', 'unauthorized']
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = localStorage.getItem("token")

  if (authRequired && !loggedIn){
    return next({name: 'login'})
  }

  if (loggedIn){
    const {role} = jwtDecode(loggedIn);
    if(to.meta.role && to.meta.role !== role){
      return next({name:'unauthorized'})
    }
  }
  return next()
})

export default router
