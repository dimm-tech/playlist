import { db, storage } from '~/plugins/firebase.js'

export const state = () => ({
  isLogin: false,
  posts: []
})

export const actions = {
  async loadFromDB({ commit }) {
    try {
      await db
        .ref()
        .once('value')
        .then(s => {
          commit('loadPosts', s.val())
        })
    } catch (err) {
      console.log(err)
    }
  },
  infoToDB({ commit }, [table, timestamp, ...payload]) {
    db.ref(`/${table}/${timestamp}`).set(...payload)
  },
  async fileToDB({ commit, dispatch }, [table, timestamp, file]) {
    await storage.ref(`${table}/${timestamp}`).put(file)
    storage
      .ref(`${table}/${timestamp}`)
      .getDownloadURL()
      .then(url => {
        db.ref(`/${table}/${timestamp}`).update({ file: url })
      })
  },
  timeFormatter({ commit }, ms) {
    let minutes = Math.floor(ms / 1000 / 60)
    let seconds = Math.floor((ms / 1000) % 60)
    seconds < 10 ? (seconds = `0${seconds}`) : seconds
    return `${minutes}:${seconds}`
  }
}

export const mutations = {
  loadPosts(state, payload) {
    state.posts = payload
  },
  loggedIn(state) {
    state.isLogin = true
  }
}

export const getters = {
  isLogin(state) {
    return state.isLogin
  }
}
