import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from "@/components/start-screen/StartScreen";
import CreateForm from "@/components/create-form/CreateForm";
import JoinForm from "@/components/join-form/JoinForm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateForm
  },
  {
    path: '/join',
    name: 'Join',
    component: JoinForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
