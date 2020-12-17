<template>
  <div class="select" @click="toggle">
    <span class="select__arrow">
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
    <div class="select__value" onmousedown="return false">{{ title }}</div>
    <ul class="select__dropdown">
      <li
        class="select__option"
        v-for="(option, id) in options"
        :key="id"
        @click="selectOption"
        :data-id="id"
      >
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    open() {
      for (let select of document.querySelectorAll('.select')) {
        if (select.classList.contains('open')) {
          select.classList.remove('open')
        }
      }
      this.$el.classList.add('open')
      this.$el.querySelector('.select__value').innerHTML = this.title

      document.addEventListener('click', this.clickListener)
    },
    close() {
      if (this.$el.getAttribute('selectedIndex')) {
        this.$el.querySelector(
          '.select__value'
        ).innerHTML = this.$el.querySelectorAll('.select__option')[
          this.$el.getAttribute('selectedIndex')
        ].innerHTML
      }
      this.$el.classList.remove('open')

      document.removeEventListener('click', this.clickListener)
    },
    toggle() {
      if (this.$el.classList.contains('open')) {
        this.close()
      } else {
        this.open()
      }
    },
    selectOption(e) {
      this.$el.querySelector('.select__value').innerHTML = e.target.innerHTML
      for (let option of this.$el.querySelectorAll('.select__option')) {
        delete option.removeAttribute('selected')
      }
      e.target.setAttribute('selected', true)
      this.$el.setAttribute('selectedIndex', e.target.getAttribute('data-id'))
    },
    clickListener(e) {
      if(!this.$el.contains(e.target)) {
        this.close()
      }
    }
  },
}
</script>

<style lang="scss">
.select {
  position: relative;
  cursor: pointer;
  &__arrow svg {
    width: 11px;
    height: 7px;
    position: absolute;
    right: 16px;
    top: 16px;
  }
  &__value {
    width: 100%;
    appearance: none;
    border: 2px solid var(--blue);
    border-radius: 4px;
    padding: 9px 16px;
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    color: var(--blue);
    background-color: var(--white);
  }
  &__dropdown {
    display: none;
  }
  &.open {
    .select__arrow svg {
      transform: rotate(180deg);
      path {
        stroke: var(--white);
      }
    }
    .select__value {
      background-color: var(--blue);
      color: var(--white);
    }
    .select__dropdown {
      display: flex;
      flex-direction: column;
      background-color: var(--grey-light);
      padding: 16px 0;
      list-style: none;
      li {
        padding: 4px 18px;
        &:hover {
          background-color: var(--grey-dark);
        }
        font-weight: 700;
        color: var(--blue);
        text-decoration: underline;
      }
      span {
        font-weight: 400;
        font-size: 13px;
        color: var(--blue);
        margin-left: 8px;
      }
    }
  }
}
</style>