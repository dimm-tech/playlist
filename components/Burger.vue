<template>
  <div class="burger" @click="toggle">
    <span></span>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      document.querySelector('.burger').classList.add('open')
    },
    close() {
      document.querySelector('.burger').classList.remove('open')
    },
    toggle() {
      if (document.querySelector('.burger').classList.contains('open')) {
        this.close()
      } else {
        this.open()
      }
      this.$emit('navToggle')
    },
  },
}
</script>

<style lang="scss" scoped>
.burger {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 25px;
  height: 19px;
  position: relative;
  z-index: 2;
  margin-bottom: 4px;
  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: $red;
    border-radius: 1px;
    transition-duration: 250ms;
    transition-property: width;
    transition-timing-function: ease-in;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 3px;
    background-color: $red;
    border-radius: 1px;
    transition-duration: 500ms;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }

  &.open {
    position: relative;
    span {
      width: 0;
      position: absolute;
      top: calc(50% - 2px);
    }
    &.burger::before {
      transform: rotate(45deg);
      top: calc(50% - 1px);
    }
    &.burger::after {
      transform: rotate(-45deg);
      top: calc(50% - 1px);
    }
  }
}
</style>