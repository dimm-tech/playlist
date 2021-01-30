<template>
  <b-card class="mb-2" no-body bg-variant="transparent">
    <b-row no-gutters>
      <b-col cols="3" sm="2">
        <b-card-img :src="trackInfo.albumImg"></b-card-img>
      </b-col>
      <b-col cols="8" sm="9" class="pt-1 pl-3 pr-1">
        <b-card-title class="track-name overflow-hidden my-1" title-tag="p">{{
          trackInfo.track
        }}</b-card-title>
        <b-card-sub-title sub-title-tag="p">{{
          trackInfo.artist
        }}</b-card-sub-title>
      </b-col>
      <b-col
        cols="1"
        class="d-inline-flex align-items-center justify-content-center"
      >
        {{ trackInfo.trackDuration }}
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: ['prop'],
  computed: {
    trackInfo() {
      return this.prop
    },
  },
}
</script>

<style lang="scss">
.track-name {
  white-space: nowrap;
  &_wrapper {
    overflow: hidden;
  }
}

.mrq {
  animation: toLeft 7s linear 1 forwards, fromRight 7s linear 7s infinite;
  @keyframes toLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-300%);
    }
  }
  @keyframes fromRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-300%);
    }
  }
}
</style>