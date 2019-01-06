import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/Pages/SignIn'
import Register from '@/components/Pages/Register'
import RegisterApplicant from  "@/components/Pages/RegisterApplicant"
import RegisterEmployer from  "@/components/Pages/RegisterEmployer"
import DashBoard from "@/components/Pages/DashBoard"
import NotFound from "@/components/Pages/NotFound"

Vue.use(Router);
// change the router mode to 'history' to remove the # from the URL
export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {      
      path: '/registerApplicant',
      name: 'RegisterApplicant',
      component: RegisterApplicant
    },
    {
      path: '/registerEmployer',
      name: 'RegisterEmployer',
      component: RegisterEmployer
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      props: true
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
