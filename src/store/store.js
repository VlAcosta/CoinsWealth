import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'



Vue.use(Vuex);

//global.serverurl = 'http://localhost:5000'
global.serverurl = 'https://coinwealth.group'

export default new Vuex.Store({
  state: {
    status: '',
    token: '',
    user: {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, data){
      state.status = 'success'
      state.token = data.token;
      state.user = data.user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = {}
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user.admin > 0,
    authStatus: state => state.status,
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: serverurl + '/api/signin', data: user, method: 'POST' })
        .then(resp => {
          const status = resp.data.status;
          switch (status) {
            case "success":
            {
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', { token: token, user: user })
              resolve(resp)
              break;
            }
            case "user_not_find":
            {
              resolve(resp)
              break;
            }
            default:
              break;
          }
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: serverurl + '/api/signup', data: user, method: 'POST' })
        .then(resp => {
          if (resp.data.status != 'error') {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', { token: token, user: user })
          }
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    check_token({commit}, data){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: serverurl + '/api/check_token', data: { token: data.token }, method: 'POST' })
        .then(resp => {
          switch (resp.data.status) {
            case 'success':
              {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', { token: token, user: user })
              }
              break;
          
            case 'invalid':
              {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
              }
              break;
          }
          resolve(resp)
        })
        .catch(err => {
          
        })
      })
    },
    change_password({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/change_password', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          
        })
      })
    },
    change_username({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/change_username', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          
        })
      })
    },
    change_avatar({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/change_avatar', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          
        })
      })
    },
    buy_packet({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/buy_packet', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          
        })
      })
    },
    create_deposit({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/create_deposit', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    create_withdraw({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/create_withdraw', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    manual_deposit({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/manual_deposit', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_wallet_history({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_wallet_history', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_admin_withdraw({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_admin_withdraw', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    edit_admin_withdraw({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/edit_admin_withdraw', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    forgot_password({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/forgot_password', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    check_link_resetpass({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/check_link_resetpass', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    reset_password({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/reset_password', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_admins_list({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_admins_list', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_admin_packages({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_admin_packages', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    save_admin_packages({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/save_admin_packages', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_user_packages({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_user_packages', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_admin_report({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_admin_report', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_wallet_packages({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_wallet_packages', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    edit_admin_role({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/edit_admin_role', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    confirm_account({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/confirm_account', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    load_admin_approval({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/load_admin_approval', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    create_approval({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/create_approval', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },

    approve_deposit({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/approve_deposit', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
    reject_deposit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({url: serverurl + '/api/reject_deposit', data: data, method: 'POST' })
        .then(resp => {
          resolve(resp)
          
        })
        .catch(err => {
          
        })
      })
    },
  }
});
