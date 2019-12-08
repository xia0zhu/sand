import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SandList from '@/views/SandList'
import SandEdit from '@/views/SandEdit'
import DataManagement from '@/views/DataManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'SandList',
      component: SandList
    },
    {
      path: '/edit/:id',
      name: 'SandEdit',
      component: SandEdit
    },
    {
      path: '/management',
      name: 'DataManagement',
      component: DataManagement
    }
  ]
})
