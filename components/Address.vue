<template>
  <address>
    <div class="phone">
      <img src="~assets/img/icon-phone.svg" alt="phone" />
      <a href="tel:+7 (926) 904 66 66">+7 (926) 904 66 66</a>
    </div>
    <div class="mail">
      <img src="~assets/img/icon-mail.svg" alt="mail" />
      <a href="mailto:hello@formlab.ru">hello@formlab.ru</a>
    </div>
  </address>
</template>

<script>
export default {}
</script>

<style lang="scss">
address {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  a {
    color: $dark;
    font-size: 18px;
    line-height: 21px;
    font-weight: 700;
    font-style: normal;
    line-height: 20px;
    white-space: nowrap;
  }
  .phone {
    a {
      text-decoration: none;
    }
    img {
      width: 16px;
      height: 22px;
      margin-right: 16px;
    }
  }
  .mail {
    margin-left: -3px;
    img {
      width: 22px;
      height: 18px;
      margin-right: 20px;
    }
  }
}

</style>