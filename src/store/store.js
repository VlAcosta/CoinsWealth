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
    isAdmin: state => state.user.admin == 1,
    authStatus: state => state.status,
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: serverurl + '/api/signin', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', { token: token, user: user })
          console.log(token, user);
          resolve(resp)
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
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', { token: token, user: user })
          console.log(token, user);
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
                console.log(resp.data.user.admin);
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', { token: token, user: user })
                console.log('success load data user', resp.data.user);
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
    }
  }
});
