import { db, storage } from '~/plugins/firebase.js'

export const state = () => ({
  isLogin: false,
  posts: [],
})

export const actions = {
  async loadFromDB({ commit }, dbTable) {
    try {
      await db.ref(dbTable).once('value').then((s) => {
        commit('loadPosts', s.val())
      })
    }
    catch (err) {
      console.log(err);
    }
  },
  infoToDB({ commit }, [table, timestamp, ...payload]) {
    db.ref(`/${table}/${timestamp}`).set(...payload);
  },
  async fileToDB({ commit, dispatch }, [table, timestamp, file]) {
    await storage.ref(`${table}/${timestamp}`).put(file)
    storage.ref(`${table}/${timestamp}`)
      .getDownloadURL()
      .then((url) => {
        db.ref(`/${table}/${timestamp}`).update({ file: url })
      })
  },
  timeFormatter({ commit }, ms) {
    let minutes = Math.floor(ms / 1000 / 60)
    let seconds = Math.floor((ms / 1000) % 60)
    seconds < 10 ? (seconds = `0${seconds}`) : seconds
    return `${minutes}:${seconds}`
  }, 
  trackDurationFromInput({ commit, dispatch }, fileInput) {
    const file = fileInput.files[0]
    const reader = new FileReader(file)
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      const audio = new Audio()
          audio.src = e.target.result
          audio.onload = function () {
            console.log(audio)
          }
          // duration = async () => {
          //   return await dispatch('timeFormatter', audio.duration * 1000)
          //   console.log('The duration of the song is of: ' + duration + ' seconds')
          // }
          // audio.addEventListener('loadedmetadata', duration)
          console.log(e.target)
        }
  //  reader.readAsDataURL(file)
  //  console.log(duration);
    // if (file) {
    //   const reader = new FileReader()
    //   reader.addEventListener('load', (e) => {
    //     audio.src = e.target.result
        
    //     duration = async () => {
    //       return await dispatch('timeFormatter', audio.duration * 1000)
    //       console.log('The duration of the song is of: ' + duration + ' seconds')
    //     }
    //     audio.addEventListener('loadedmetadata', duration)
    //     console.log(duration);
    //   })
    //   reader.readAsDataURL(file)
    // }
    //return duration
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