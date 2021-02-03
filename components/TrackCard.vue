<template>
  <div class="track">
    <img :src="trackInfo.albumImg" />
    <div class="track--info">
      <div class="track--info-text">
        <p class="track--info-name">{{ trackInfo.track }}</p>
        <p class="track--info-artist">{{ trackInfo.artist }}</p>
      </div>
      <p class="track--info-duration">{{ trackInfo.trackDuration }}</p>
    </div>
  </div>
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
.track {
  display: flex;
  width: 100%;
  img {
    width: 15%;
    object-fit: cover;
  }
  &--info {
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    border: 1px solid rgba(white, 0.0625);
    border-left: none;
    border-radius: 6px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &-text {
      width: 80%;
      padding-top: .25rem;
    }
    &-name {
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }
    &-artist {
      opacity: 0.5;
    }
    &-duration {
      width: 20%;
      align-self: center;
      text-align: right;
      font-size: 0.875rem;
      opacity: 0.75;
    }
  }
  &:hover {
    cursor: pointer;
    .track--info {
      background-color: rgba(#ffffff, 0.0625);
    }
  }
}

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