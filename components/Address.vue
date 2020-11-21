<template>
  <address>
    <a class="phone" href="tel:+7 (926) 904 66 66">+7 (926) 904 66 66</a>
    <a class="mail" href="mailto:hello@formlab.ru">hello@formlab.ru</a>
  </address>
</template>

<script>
export default {};
</script>

<style lang="scss">
address {
  text-align: center;
  a {
    display: block;
    color: $dark;
    font-size: 12px;
    font-weight: 700;
    font-style: normal;
    line-height: 20px;
    position: relative;
    white-space: nowrap;
  }
  .phone {
    text-decoration: none;
    &::before {
      content: "";
      background-image: url("~assets/img/icon-phone.svg");
      background-size: cover;
      background-position: center;
      width: 11px;
      height: 16px;
      position: absolute;
      left: -19px;
      top: 50%;
      margin-top: -8px;
    }
  }
  .mail {
    &::before {
      content: "";
      background-image: url("~assets/img/icon-mail.svg");
      background-size: cover;
      background-position: center;
      width: 16px;
      height: 13px;
      position: absolute;
      left: -22px;
      top: 50%;
      margin-top: -6.5px;
    }
  }
}
</style>