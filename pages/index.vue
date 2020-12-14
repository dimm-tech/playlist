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
  background-image: linear-gradient(to top, rgba($dark, 0.7), rgba($dark, 0.7)),
    url('~assets/img/bg-first-screen-mobile.jpg');
  background-size: cover;
  background-position: center;
  h1 {
    max-width: 670px;
    font-size: 34px;
    line-height: 40px;
    color: $white;
  }
  img {
    max-width: 220px;
    margin: 28px 0;
    align-self: flex-start;
  }
  p {
    max-width: 570px;
    font-weight: 400;
    line-height: 17px;
    color: $white;
  }
  @include _576 {
    height: 600px;
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
}
.development {
  .select {
    margin-bottom: 10px;
  }
}
.tile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  //  grid-template-rows: repeat(3);
  grid-column-gap: 10px;
  grid-row-gap: 30px;
  article {
    overflow: hidden;
    color: $dark;
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
    grid-template-columns: auto auto auto;
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
    grid-template-columns: auto auto auto auto;
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

// .tile {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   article {
//     flex-basis: 50%;
//     color: $dark;
//     margin-bottom: 20px;
//     overflow: hidden;
//     img {
//       display: block;
//       object-fit: cover;
//       object-position: center;
//       height: 192px;
//     }
//     .category {
//       font-size: 12px;
//       line-height: 16px;
//       margin: 4px 0;
//     }
//     h3 {
//       font-weight: 500;
//       font-size: 16px;
//       line-height: 22px;
//     }
//     .description {
//       display: none;
//       font-size: 13px;
//       line-height: 18px;
//     }
//     &:first-child {
//       flex-basis: 100%;
//       .category {
//         margin-bottom: 0;
//       }
//       h3 {
//         font-size: 24px;
//         line-height: 34px;
//       }
//       .description {
//         display: block;
//       }
//     }
//   }

//   @include _576 {
//     article {
//       flex-basis: 33%;
//       &:first-child {
//         flex-basis: 66%;
//       }
//     }
//   }

//   @include _768 {
//     article {
//       img {
//         height: 240px;
//       }
//     }
//   }

//   @include _992 {
//     article {
//       flex-basis: 25%;
//       img {
//         height: 300px;
//       }
//       &:first-child {
//         flex-basis: 50%;
//       }
//     }
//   }
// }
</style>
