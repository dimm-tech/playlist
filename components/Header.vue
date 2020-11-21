<template>
  <header class="flex">
    <div class="flex">
      <Navbar />
      <img src="~assets/img/logo-text.svg" alt="formlab" />
    </div>
    <Address />
  </header>
</template>

<script>
import Navbar from "@/components/Navbar";
import Address from "@/components/Address";
export default {
  components: {
    Navbar,
    Address,
  },
};
</script>

<style lang="scss">
header {
  width: 100%;
  padding: 19px 9px 20px 11px;
}
</style>