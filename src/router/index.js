import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SandList from '@/views/SandList'
import SandEdit from '@/views/SandEdit'
import SandSave from '@/views/saveSand'
import DataManagement from '@/views/DataManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SandList',
      component: SandList
    },
    {
      path: '/list',
      name: 'SandList',
      component: SandList
    },
    {
      path: '/save',
      name: 'SandSave',
      component: SandSave
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
