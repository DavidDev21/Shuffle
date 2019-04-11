import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test1',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/SignIn.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {      
      path: '/register-applicant',
      name: 'register-applicant',
      component: () => import(/* webpackChunkName: "about" */ './views/RegisterApplicant.vue'),
    },
    {
      path: '/register-employer',
      name: 'register-employer',
      component: () => import(/* webpackChunkName: "about" */ './views/RegisterEmployer.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/DashBoard.vue'),
      props: true
    },
    {
      path: '/apply-job',
      name: 'apply-job',
      component: () => import(/* webpackChunkName: "about" */ './views/ApplyJob.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/ApplicationStatus',
      name: 'ApplicationStatus',
      component: () => import(/* webpackChunkName: "about" */ './views/ApplicationStatus.vue'),
      props: true
    },
    {
      path:'/get-applicant',
      name: 'get-applicant',
      component: () => import('./views/ViewApplicant.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue'),
    },
    {
      path: '/password-change-verify',
      name: 'password-change-verify',
      component: () => import(/* webpackChunkName: "about" */ './views/PasswordChangeVerify.vue'),
    },
    {
      path: '/password-change',
      name: 'password-change',
      component: () => import(/* webpackChunkName: "about" */ './views/PasswordChange.vue'),
    },
    {
      path: '/post-job',
      name: 'post-job',
      component: () => import(/* webpackChunkName: "about" */ './views/PostJob.vue'),
    }
  ],
});
