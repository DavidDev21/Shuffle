import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/testFile',
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
      props: true,
    },
    {
      path: '/apply-job',
      name: 'apply-job',
      component: () => import(/* webpackChunkName: "about" */ './views/ApplyJob.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/application-status',
      name: 'application-status',
      component: () => import('./views/ApplicationStatus.vue'),
    },
    {
      path:'/get-applicant',
      name: 'get-applicant',
      component: () => import('./views/ViewApplicant.vue'),
    },
    {
      path: '/post-job',
      name: 'post-job',
      component: () => import('./views/PostJob.vue'),
    },
    {
      path: '/manage-job',
      name: 'manage-job',
      component: () => import('./views/ViewJobPosts.vue'),
    },
    {
      path: '/reset-pass-form',
      name: 'ResetPassForm',
      component: () => import('./views/ResetPassForm.vue'),
    },
    {
      path: '/change-password/:email',
      name: 'change-password',
      component: () => import('./views/ChangePassword.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue'),
    },
  ],
});
