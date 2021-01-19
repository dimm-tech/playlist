<template>
  <section class="list">
    <h1>music</h1>
    <article>
      <ul>
        <li v-for="p in posts.music" :key="p.id">
          <div>{{ p.artistName}} - {{p.trackName }}</div>
          <audio :src="p.file" controls></audio>
        </li>
      </ul>
    </article>
  </section>
</template>

<style lang="scss">
.list {
  ul {
    margin-left: 1rem;
  }
  p {
    font-size: 0.65rem;
  }
  audio {
    width: 100%;
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
  },
}
</script>