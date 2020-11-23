<template>
  <div>
    <div class="burger" @click="menuToggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="nav close">
      <div class="nav__row flex">
        <img
          class="nav__close"
          src="~assets/img/icon-close.svg"
          alt="close menu"
          @click="menuToggle"
        />
        <h2>Меню</h2>
        <img
          class="nav__logo"
          src="~assets/img/logo-avatar.svg"
          alt="formlab"
        />
      </div>
      <nav>
        <ul>
          <li v-for="page in pages" :key="page.link">
            <a @click.prevent :href="'/' + page.link">{{page.title}}</a>
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
import Address from "@/components/Address";
export default {
  components: {
    Address,
  },
  computed: {
    pages() {
      return this.$store.state.pages.list
    }
  },
  methods: {
    menuToggle() {
      let nav = document.querySelector(".nav")
      nav.classList.toggle("close");

      function listener(e) {
        if(!document.querySelector('header').contains(e.target)) {
          nav.classList.add("close");
        }
      }

      if(!nav.classList.contains('close')) {
        document.addEventListener('click', listener)
      } 
    },
  },
};
</script>

<style lang="scss">
.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 19px;
  margin-right: 25px;
  span {
    display: block;
    height: 3px;
    background-color: $red;
    border-radius: 1px;
  }
}

.nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: $white;
  .nav__close {
    padding-right: 38px;
  }
  .nav__row {
    padding: 18px 10px 0 14px;
    h2 {
      flex-grow: 2;
      margin: 0;
    }
  }
  .nav__logo {
    width: 36px;
  }
  .address-wrapper {
    height: 123px;
    background-color: $grey-light;
    padding: 30px 93px;
    address {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      a {
        font-size: 18px;
        line-height: 21px;
      }
      .phone {
        &::before {
          width: 16px;
          height: 22px;
          left: -33px;
          top: 50%;
          margin-top: -11px;
        }
      }
      .mail {
        &::before {
          width: 22px;
          height: 18px;
          left: -44px;
          top: 50%;
          margin-top: -9px;
        }
      }
    }
  }
}

nav {
  ul {
    list-style: none;
    height: 226px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px 200px 40px 71px;
    a {
      text-decoration: none;
      color: $dark;
      font-size: 18px;
      font-weight: 400;
      line-height: 21px;
    }
  }
}

.close {
  display: none;
}
</style>