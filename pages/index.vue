<template>
  <section class="list">
    <router-link to="/search">search</router-link>
    <h1 class="py-3">music</h1>
    <article>
      <ul>
        <li v-for="p in posts.music" :key="p.id">
          <div>{{ p.artistName }} - {{ p.trackName }}</div>
          <audio :src="p.file" controls></audio>
        </li>
      </ul>
    </article>
  </section>
</template>

<style lang="scss">
.list {
  margin-left: 1rem;

  ul {
    padding: 0;
    margin: 0 1rem;
    list-style: none;
  }
  p {
    font-size: 0.65rem;
  }
  audio {
    width: 100%;
    margin-top: 1rem;
    &:focus {
      outline: none;
    }
  }
}
</style>

<script>
import { storage } from '~/plugins/firebase.js'
export default {
  data() {
    return {}
  },
  computed: {
    posts() {
      return this.$store.state.posts
    },
  },
  mounted() {
    this.$store.dispatch('loadFromDB')
  },
}
</script>