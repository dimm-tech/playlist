<template>
  <nav>
    <div class="nav__title flex">
      <p>Меню</p>
      <img src="~assets/img/logo-avatar.svg" alt="formlab" />
    </div>
    <ul>
      <li v-for="page in pages" :key="page.link">
        <a @click.prevent :href="'/' + page.link">{{ page.title }}</a>
      </li>
    </ul>
    <Address />
  </nav>
</template>

<style lang="scss">
nav {
  display: none;
  flex-grow: 2;
  .nav__title {
    display: none;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 var(--body-gap);
    a {
      text-decoration: none;
      color: var(--dark);
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
    }
  }
  address {
    display: flex;
    align-items: flex-start;
    height: 120px;
    padding: 30px 0 30px 70px;
    background-color: var(--grey-light);
    a {
      font-size: 18px;
    }
    .phone {
      margin-left: 4px;
      img {
        width: 16px;
        height: 22px;
        margin-right: 16px;
      }
    }
    .mail {
      img {
        width: 22px;
        height: 18px;
        margin-right: 20px;
      }
    }
  }
  &.open {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    background-color: var(--white);
    z-index: 1;
    .nav__title {
      display: flex;
      padding-left: 70px;
      p {
        font-weight: 900;
        font-size: 36px;
        line-height: 42px;
        color: var(--dark);
        padding-top: 20px;
      }
      img {
        width: 36px;
        padding-top: 20px;
        margin-right: 10px;
      }
    }

    ul {
      height: 225px;
      flex-direction: column;
      justify-content: space-between;
      margin: 30px 0 40px 70px;
      a {
        text-decoration: none;
        color: var(--dark);
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
      }
    }
  }
  @include _768 {
    display: block;
    address {
      display: none;
    }
  }
  @include _992 {
    ul {
      margin: 0 calc(var(--body-gap) / 2);
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
  methods: {
    // open() {
    //   document.querySelector('nav').classList.add('open')
    //   document.addEventListener('click', this.clickListener)
    // },
    // close() {
    //   document.querySelector('nav').classList.remove('open')
    //   document.removeEventListener('click', this.clickListener)
    // },
    // toggle() {
    //   if (document.querySelector('nav').classList.contains('open')) {
    //     this.close()
    //   } else {
    //     this.open()
    //   }
    // },
    // clickListener(e) {
    //   if (!document.querySelector('header').contains(e.target)) {
    //     this.$refs.Burger.close()
    //     this.close()
    //   }
    // },
  },
}
</script>