import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Group from '@/components/instruments/search/Group'
import Users from '@/components/instruments/search/Users'
import Parents from '@/components/instruments/search/Parents'
import Birthdays from '@/components/instruments/search/Birthdays'
import Friends from '@/components/instruments/collect/Friends'
import Subscribers from '@/components/instruments/collect/Subscribers'
import RecentlyJoin from '@/components/instruments/collect/RecentlyJoin'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      name:'home',
      component:Home
    },
    {
      path:'/group',
      name:'group',
      component:Group
    },
    {
      path:'/friends',
      name:'friends',
      component:Friends
    },
    {
      path:'/users',
      name:'users',
      component:Users
    },
    {
      path:'/parents',
      name:'parents',
      component:Parents
    },
    {
      path:'/birthdays',
      name:'birthdays',
      component:Birthdays
    },
    {
      path:'/subscribers',
      name:'subscribers',
      component:Subscribers
    },
    {
      path:'/recentlyjoin',
      name:'recentlyjoin',
      component:RecentlyJoin
    }
  ],
  mode:'history'
})
