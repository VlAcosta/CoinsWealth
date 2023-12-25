import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store/store.js'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import ForgotPassView from '../views/ForgotPassView.vue'
import ReferralView from '../views/ReferralView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import ProfileView from '../views/ProfileView.vue'
import WalletView from '../views/WalletView.vue'
import TermsView from '../views/TermsView.vue'
import AboutView from '../views/AboutView.vue'
import FAQView from '../views/FAQView.vue'
import View404 from '../views/404View.vue'
import AdminsView from '../views/Admins.vue'
import MarketView from '../views/Market.vue'
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: HomeView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { 
      title: 'Sign in',
      authPage: true
    },
    component: SingInView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: { 
      title: 'Sign up',
      authPage: true
    },
    component: SignUpView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    meta: { title: 'Forgot password' },
    component: ForgotPassView
  },
  {
    path: '/referral-program',
    name: 'referral-program',
    meta: { title: 'Refferal Program' },
    component: ReferralView
  },
  {
    path: '/privacy',
    name: 'privacy',
    meta: { title: 'Privacy policy' },
    component: PrivacyView
  },
  {
    path: '/terms',
    name: 'terms',
    meta: { title: 'Tearms of Use and Rules' },
    component: TermsView
  },
  {
    path: '/profile',
    alias: ['/profile/account-details', '/profile/account-statistics'],
    name: 'profile',
    meta: {
      title: 'Profile',
      requiresAuth: true
   },
    component: ProfileView
  },
  {
    path: '/wallet',
    alias: ['/wallet/deposit', '/wallet/withdraw', '/wallet/history'],
    name: 'wallet',
    meta: {
      title: 'Wallet',
      requiresAuth: true
    },
    component: WalletView
  },
  {
    path: '/faq',
    name: 'faq',
    meta: {title: 'FAQ'},
    component: FAQView
  },
  {
    path: '/about',
    name: 'about',
    meta: {title: 'About'},
    component: AboutView
  },
  {
    path: '/admin',
    alias: ['/admin/deposit','/admin/withdraw'],
    name: 'admin',
    meta: {
      title: 'Admins',
      adminPage: true
    },
    component: AdminsView
  },
  {
    path: '/market',
    name: 'market',
    meta: {
      title: 'Market',
      requiresAuth: true
    },
    component: MarketView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    meta: {title: '404'},
    component: View404
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const DEFAULT_TITLE = 'Coin Wealth';

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = to.meta.title + " | " + DEFAULT_TITLE || DEFAULT_TITLE;
  });
});


router.beforeEach((to, from, next) => {
  try {
    if (localStorage.token.length > 10) store.dispatch('check_token', { token: localStorage.token })
  } catch (err) {}
  setTimeout(() => {
    if(to.meta.requiresAuth) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/sign-in') 
    } else {
      next() 
    }
    if(to.meta.authPage) {
      if (!store.getters.isLoggedIn) {
        next()
        return
      }
      next('/profile') 
    } else {
      next() 
    }
    if(to.meta.adminPage) {
      
      if (store.getters.isLoggedIn && store.getters.isAdmin) {
        next()
        return
      }
      next('/') 
    }
  }, 150);
})

export default router
