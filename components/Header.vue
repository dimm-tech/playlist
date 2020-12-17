<template>
  <header class="content plr">
    <div class="flex">
      <Burger ref="Burger" />
      <img class="header__logo" src="~assets/img/logo-text.svg" alt="formlab" />
    </div>
    <Navbar />
    <Address />
  </header>
</template>

<style lang="scss">
header {
  height: 80px;
  background-color: --white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .header__logo {
    width: min-content;
  }
}
</style>

<script>
import Burger from '~/components/Burger'
import Navbar from '~/components/Navbar'
import Address from '~/components/Address'
export default {
  components: {
    Burger,
    Navbar,
    Address,
  },
}
</script>