<template>
  <div class="content">
    <section class="first-screen plr">
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
    <section class="development plr">
      <h2>Разработано</h2>
      <Select :title="'Все проекты'" :options="department" />
      <Select :title="'Отрасль'" :options="department" />
      <Select :title="'Назначение'" :options="department" />
    </section>
    <main class="tile plr">
      <article v-for="project in projects" :key="project.id">
        <img :src="project.img" alt="" />
        <div>
          <p class="category">{{ project.category }}</p>
          <h3>{{ project.name }}</h3>
          <p class="description">{{ project.desc }}</p>
        </div>
      </article>
    </main>
    <br /><br /><br /><br /><br />
  </div>
</template>

<script>
import Select from '@/components/Select'
export default {
  components: {
    Select,
  },
  computed: {
    department() {
      return this.$store.state.department
    },
    projects() {
      return this.$store.state.projects
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.first-screen {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(
      to top,
      rgba(#323E48, 0.7),
      rgba(#323E48, 0.7)
    ),
    url('~assets/img/bg-first-screen-mobile.jpg');
  background-size: cover;
  background-position: center;
  h1 {
    max-width: 670px;
    font-size: 34px;
    line-height: 40px;
    color: var(--white);
  }
  img {
    max-width: 220px;
    height: min-content;
    margin: 28px 0;
    align-self: flex-start;
  }
  p {
    max-width: 570px;
    font-weight: 400;
    line-height: 17px;
    color: var(--white);
  }
  @include _576 {
    background-image: linear-gradient(
        to top,
        rgba(#323E48, 0.7),
        rgba(#323E48, 0.7)
      ),
      url('~assets/img/bg-first-screen-desktop.jpg');
  }
  @include _768 {
    h1 {
      font-size: 50px;
      line-height: 58px;
    }
    p {
      font-size: 18px;
      line-height: 21px;
    }
  }
  @include _1366 {
    height: 600px;
  }
}
.development {
  .select {
    margin-bottom: 10px;
  }
}
.tile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 30px;
  margin-top: 20px;
  article {
    overflow: hidden;
    color: var(--dark);
    grid-column: span 1;
    &:first-child {
      grid-column: span 2;
      .description {
        display: block;
      }
    }
    &:nth-child(n + 6) {
      display: none;
    }
    img {
      display: block;
      object-fit: cover;
      object-position: center;
      height: 192px;
    }
    .description {
      display: none;
    }
  }
  @include _576 {
    grid-template-columns: 1fr 1fr 1fr;
    article {
      &:nth-child(n + 6) {
        display: block;
      }
      &:last-child {
        grid-column: span 2;
      }
    }
  }
  @include _768 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @include _992 {
    grid-column-gap: 20px;
    grid-row-gap: 40px;
  }
  @include _1200 {
    grid-column-gap: 30px;
    grid-row-gap: 50px;
    article {
      img {
        height: 300px;
      }
    }
  }
}
</style>
