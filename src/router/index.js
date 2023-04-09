import Vue from "vue";
import VueRouter from "vue-router";
import socket from "@/socket";
import StartScreen from "@/components/start-screen/StartScreen";
import CreateForm from "@/components/create-form/CreateForm";
import JoinForm from "@/components/join-form/JoinForm";
import Vote from "@/components/vote/Vote";
import { EVENTS_NAMES } from "@/constants";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "StartScreen",
    component: StartScreen,
  },
  {
    path: "/create",
    name: "Create",
    component: CreateForm,
  },
  {
    path: "/join/:roomId?",
    name: "Join",
    component: JoinForm,
  },
  {
    path: "/vote/:roomId",
    name: "Vote",
    component: Vote,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

socket.on(EVENTS_NAMES.redirectToVote, (roomId) =>
  router.push(`/vote/${roomId}`)
);

export default router;
