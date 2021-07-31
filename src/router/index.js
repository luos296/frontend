import Vue from 'vue'
import VueRouter from 'vue-router'
import Testcase from '../views/Testcase.vue'
import Task from '../views/Task.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'/layout'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: 'testcase',
        name: 'Testcase',
        component: Testcase
      },
      {
        path: 'task',
        name: 'Task',
        component: Task
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
