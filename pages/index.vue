<template>
  <div>
    <Header />
    <section class="first-screen">
      <h1>
        FORMLAB - промышленный дизайн, разработка корпусов и панелей для
        приборостроения
      </h1>
      <img src="~assets/img/lines-blue.svg" />
      <p>
        Формлаб самый большой разработчик корпусов в России — в 2019 году мы
        закончили 54 проекта. В нашем портфолио 250+ проектов по очень разным
        направлениям, больше 100 из них показаны поэтапно и в деталях:
      </p>
    </section>
    <section class="development">
      <h2>Разработано</h2>
      <div class="select-wrapper">
        <span class="arrow">
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 1L5.5 5.5L1 1" stroke="#00BEDB" stroke-width="2" />
          </svg>
        </span>
        <select
          name="department"
          onmousedown="return false"
          @click="openSelect"
        >
          <option class="optgroup" value="Отрасль">Отрасль</option>
          <option v-for="item in department" :key="item.id" :value="item.title">
            {{ item.title }}
          </option>
        </select>
        <ul class="select">
          <li v-for="item of department" :key="item.id">
            <a @click.prevent="clickOption" href="#">{{ item.title }}</a>
            <span>{{ item.num }}</span>
          </li>
        </ul>
      </div>
      <br /><br /><br /><br /><br />
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  computed: {
    department() {
      return this.$store.state.pages.department;
    },
  },
  methods: {
    openSelect(e) {
      e.target.value = e.target.querySelector('.optgroup').value
      e.target.parentNode.classList.toggle("open");
    },
    clickOption(e) {
      function selectParent(el) {
        if (el.parentNode.classList.value.includes("select-wrapper")) {
          return el.parentNode;
        } else {
          return selectParent(el.parentNode)
        }
      }
      selectParent(e.target).classList.toggle("open")
      selectParent(e.target).querySelector('select').value = e.target.innerHTML 
    },
  },
};
</script>

<style lang="scss">
.first-screen {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to top, rgba($dark, 0.7), rgba($dark, 0.7)),
    url("~assets/img/bg-first-screen-mobile.jpg");
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
.development {
  margin: 0 10px;
  .select-wrapper {
    position: relative;
    .arrow svg {
      width: 11px;
      height: 7px;
      position: absolute;
      right: 16px;
      top: 16px;
    }
    select {
      width: 100%;
      appearance: none;
      border: 2px solid $blue;
      border-radius: 4px;
      padding: 9px 16px;
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
      color: $blue;
      background-color: $white;
    }
    .select {
      display: none;
    }
  }
  .open {
    select {
      background-color: #00bedb;
      color: #ffffff;
    }
    .select {
      display: flex;
      flex-direction: column;
      background-color: $grey-light;
      padding: 20px 18px;
      list-style: none;
      li {
        margin-bottom: 8px;
        &:last-child {
          margin-bottom: 0;
        }
        a {
          font-weight: 700;
          color: $blue;
        }
      }
      span {
        font-weight: 400;
        font-size: 13px;
        color: $blue;
        margin-left: 8px;
      }
    }
    .arrow svg {
      transform: rotate(180deg);
      path {
        stroke: $white;
      }
    }
  }
}
</style>
