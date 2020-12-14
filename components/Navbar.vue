<template>
  <div>  
    <div class="burger-wrapper">
      <Burger @navToggle="toggle" ref="Burger" />
    </div>
    <div class="nav">
      <div class="nav__header flex">
        <p>Меню</p>
        <img
          class="nav__logo"
          src="~assets/img/logo-avatar.svg"
          alt="formlab"
        />
      </div>
      <nav>
        <ul>
          <li v-for="page in pages" :key="page.link">
            <a @click.prevent :href="'/' + page.link">{{ page.title }}</a>
          </li>
        </ul>
      </nav>
      <div class="address-wrapper">
        <Address />
      </div>
    </div>
  </div>
</template>

<script>
import Burger from '@/components/Burger'
import Address from '@/components/Address'
export default {
  components: {
    Burger,
    Address,
  },
  computed: {
    pages() {
      return this.$store.state.list
    },
  },
  methods: {
    open() {
      document.querySelector('.nav').classList.add('open')
      document.addEventListener('click', this.clickListener)
    },
    close() {
      document.querySelector('.nav').classList.remove('open')
      document.removeEventListener('click', this.clickListener)
    },
    toggle() {
      if (document.querySelector('.nav').classList.contains('open')) {
        this.close()
      } else {
        this.open()
      }
    },
    clickListener(e) {
      if (!document.querySelector('header').contains(e.target)) {
        this.$refs.Burger.close()
        this.close()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.burger-wrapper {
  position: absolute;
  left: 10px;
  top: 30px;
}
.nav {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: $white;
  .nav__close {
    padding-right: 38px;
  }
  .nav__header {
    padding: 18px 10px 0 16px;
    p {
      flex-grow: 2;
      margin-left: 50px;
      font-weight: 900;
      font-size: 36px;
      line-height: 42px;
      color: $dark;
    }
  }
  .nav__logo {
    width: 36px;
  }
  address {
    height: 123px;
    background-color: $grey-light;
    padding: 30px 70px;
  }
}

nav {
  ul {
    list-style: none;
    height: 226px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px 200px 40px 70px;
    a {
      text-decoration: none;
      color: $dark;
      font-size: 18px;
      font-weight: 400;
      line-height: 21px;
    }
  }
}

.open {
  display: block;
}

@include _992 {
  .nav {
    display: block;
    width: min-content;
    position: relative;
    background-color: transparent;
  }
  .burger,
  .nav__header,
  .address-wrapper {
    display: none;
  }
  nav {
    ul {
      flex-direction: row;
      justify-content: center;
      height: min-content;
      margin: 0;
      li {
        margin-left: 26px;
      }
      a {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
  .address {
    flex-direction: row;
    align-items: center;
  }
}
</style>