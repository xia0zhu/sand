import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SandList from '@/views/SandList'
import SandEdit from '@/views/SandEdit'
import SandSave from '@/views/saveSand'
import DataManagement from '@/views/DataManagement'
import SaveManagement from '@/views/SaveManagement'

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
      path: '/mall',
      name: 'SaveManagement',
      component: SaveManagement
    },
    {
      path: '/edit/:id/:print',
      name: 'SandEdit',
      component: SandEdit
    },
    {
      path: '/stuff/:id',
      name: 'stuffEdit',
      component: DataManagement
    }
  ]
})
