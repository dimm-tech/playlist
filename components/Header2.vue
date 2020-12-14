<template>
  <header>
    <img class="header__logo" src="~assets/img/logo-text.svg" alt="formlab" />
    <nav>
      <ul>
        <li v-for="page in pages" :key="page.link">
          <a @click.prevent :href="'/' + page.link">{{ page.title }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  height: 80px;
  background-color: $white;
  display: flex;
  justify-content: space-around;
  .header__logo {
    width: min-content;
  }
  nav {
    flex-shrink: 2;
    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      a {
        text-decoration: none;
        color: $dark;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
      }
    }
  }
}
</style>

<script>
export default {
  computed: {
    pages() {
      return this.$store.state.menu
    },
  },
}
</script>