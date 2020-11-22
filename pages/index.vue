<template>
  <div>
    <Header/>
    <section class="first-screen">
      <h1>FORMLAB - промышленный дизайн, разработка корпусов и панелей для приборостроения</h1>
      <img src="~assets/img/lines-blue.svg">
      <p>Формлаб самый большой разработчик корпусов в России — в 2019 году мы закончили 54 проекта. В нашем портфолио 250+ проектов по очень разным направлениям, больше 100 из них показаны поэтапно и в деталях:</p>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  }
}
</script>

<style lang="scss">
  .first-screen {
    height: calc(100vh - 80px); 
    display: flex;
    flex-direction: column;
    justify-content: center;   
    background-image: linear-gradient(to top, rgba($dark, 0.7),rgba($dark, 0.7)), url('~assets/img/bg-first-screen-mobile.jpg');
    background-size: cover;
    background-position: center;
    padding: 0 10px;
    h1 {
      font-size: 34px;
      line-height: 40px; 
      color: $white; 
    }
    img {
      margin: 28px 0;
      align-self: flex-start;
    }
    p {
      font-weight: 400;
      line-height: 17px;
      color: $white;
    }
  }
</style>
