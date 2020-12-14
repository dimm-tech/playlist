<template>
  <header class="flex plr">
    <img class="header__logo" src="~assets/img/logo-text.svg" alt="formlab" />
    <Navbar />
    <Address class="address" />
  </header>
</template>

<script>
import Navbar from '@/components/Navbar'
import Address from '@/components/Address'
export default {
  components: {
    Navbar,
    Address,
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 78px;
  position: relative;
  max-width: 1366px;
  margin: 0 auto;
  padding: 20px 10px 20px 10px;
  .header__logo {
    width: min-content;
    height: min-content;
    margin-left: 50px;
  }
  .address {
        height: min-content;
    a {
      font-size: 12px;
    }
    .phone {
      img {
        width: 11px;
        height: 16px;
        margin-right: 8px;
      }
    }
    .mail {
      img {
        width: 16px;
        height: 13px;
        margin-right: 10px;
      }
    }
  }
  @include _992 {
    .header__logo {
      margin: 0;
    }
    .address {
      .mail {
        margin-left: 34px;
      }
    }
  }
}
</style>