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
    <button>Связаться</button>
  </address>
</template>

<script>
export default {};
</script>

<style lang="scss">
address {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  div {
    display: flex;
    align-items: center;
  }
  a {
    color: var(--dark);
    font-size: 12px;
    line-height: 14px;
    font-weight: 700;
    font-style: normal;
    white-space: nowrap;
  }
  .phone {
    margin-left: 7px;
    a {
      text-decoration: none;
    }
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

  //   a {
  //     text-decoration: none;
  //   }
  //   img {
  //     width: 16px;
  //     height: 22px;
  //     margin-right: 16px;
  //   }
  // }
  // .mail {
  //   img {
  //     width: 22px;
  //     height: 18px;
  //     margin-right: 20px;
  //   }
  // }

  button {
    display: none;
    width: 100px;
    height: 30px;
    font: 700 12px/14px "Roboto";
    color: --red;
    background-color: transparent;
    border: 2px solid --red;
    border-radius: 4px;
    margin-left: calc(var(--body-gap) / 2.5);
  }
  @include _992 {
    flex-direction: row;
    .phone {
      margin-left: 0;
    }
    .mail {
      margin-left: calc(var(--body-gap) / 2.5);
    }
    button {
      display: block;
    }
  }
}
</style>