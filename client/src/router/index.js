import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/Pages/SignIn'
import Register from '@/components/Pages/Register'
import NotFound from '@/components/Pages/NotFound'

Vue.use(Router);
// change the router mode to 'history' to remove the # from the URL
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
