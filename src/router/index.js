import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Index from '../components/pages/Index'
import Details from '../components/pages/Details'
import Comments from '../components/pages/Comments'
import Mycollect from '../components/pages/Mycollect'
export default new Router({
  mode:'history',
  routes: [
    {
      path:'/index',
      component:Index
    },
    {
      path:'/details',
      component:Details
    },
    {
      path:'/comment',
      component:Comments
    },
    {
      path:'/collect',
      component:Mycollect
    },
    {
      path:'*',
      redirect:'/index'
    },
  ]
})
