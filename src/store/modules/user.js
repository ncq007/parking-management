import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, usernameEn, passwordEn, pk } = userInfo
    return new Promise((resolve, reject) => {
      login({
        publicKey: pk,
        loginCode: usernameEn,
        password: passwordEn
      }).then(response => {
        const { info } = response
        commit('SET_TOKEN', info.token)
        commit('SET_NAME', username)
        commit('SET_AVATAR', 'http://chenqim.xyz:9001/images/img_2666.jpg')
        setToken(info.token)
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('menu', JSON.stringify(info.menu.filter(e => e.resourceType === '0')))
        // 登录之后的每个接口都需要用到这两个参数，所以直接存在 sessionStorage 里面最方便
        sessionStorage.setItem('pk', pk)
        sessionStorage.setItem('usernameEn', usernameEn)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        name: sessionStorage.getItem('username'),
        acatar: 'http://chenqim.xyz:9001/images/img_2666.jpg'
      }
      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.acatar)
      resolve(data)
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({
        loginName: state.name
      }).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

