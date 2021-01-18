<template>
  <section class="login">
    <h1>login please</h1>
    <input type="text" placeholder="email" v-model="email" /><br />
    <input type="password" placeholder="password" v-model="pass" /><br />
    <p></p>
    <button @click="login">connect</button>
  </section>
</template>

<style lang="scss">
  .login {
    text-align: center;
  }
</style>

<script>
import { auth } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      email: '',
      pass: '',
    }
  },
  methods: {
    login: function () {
      auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.$store.commit('loggedIn')
          this.$router.push({ path: '/add' })
        })
        .catch((err) => {
          document.querySelector('.login').querySelector('p').innerHTML = err.message
          console.log(err.message)
        })
    },
  },
}
</script>