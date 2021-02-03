<template>
  <section class="search">
    <router-link to="/">music</router-link>
    <h1 class="py-3">search for track info</h1>
    <input
      id="search-query"
      v-model="query"
      @input="search"
      @change="longTrackNameHandler"
    />
    <span>artist or track name</span>

      <track-card
        class="track-card"
        v-for="(trackInfo, k) in items"
        :key="k"
        :prop="trackInfo"
      ></track-card>

    <!-- <section class="picked" v-if="isPicked">
      <div>
        <img :src="tracks[0].albumImg" />
        <form class="addForm">
          <label for="artist">Исполнитель</label>
          <input
            id="artist"
            type="text"
            v-model.trim="tracks[0].artist"
            :class="{
              invalid: $v.artist.$dirty && !$v.artist.required,
            }"
          />
          <small v-if="$v.artist.$dirty && !$v.artist.required"
            >заполните это поле</small
          >

          <label for="track">Композиция</label>
          <input
            id="track"
            type="text"
            v-model.trim="tracks[0].track"
            :class="{
              invalid: $v.track.$dirty && !$v.track.required,
            }"
          />
          <small v-if="$v.track.$dirty && !$v.track.required"
            >заполните это поле</small
          >

          <label for="album">Альбом</label>
          <input
            id="album"
            type="text"
            v-model.trim="tracks[0].album"
            :class="{
              invalid: $v.track.$dirty && !$v.track.required,
            }"
          />
          <small v-if="$v.track.$dirty && !$v.track.required"
            >заполните это поле</small
          >

          <label for="year">Год</label>
          <input
            id="year"
            type="text"
            v-model.trim="tracks[0].album"
            :class="{
              invalid: $v.track.$dirty && !$v.track.required,
            }"
          />

          <div class="tags">
            <label for="tags">Тэги</label>
            <input id="tags" type="text" />
            <span class="addTag" @click="addTag">+</span>
            <div class="tag" v-for="tag in tags" :key="tag.id">
              <span class="tagVal">{{ tag }}</span>
              <span class="delTag" @click="delTag">-</span>
            </div>
          </div>
        </form>
      </div>

      <button class="toDB">to DataBase</button>
    </section> -->

    <!-- <div class="input-file">
      <input id="file" type="file" />
        <label for="file">choose a file...</label>
    </div> -->
  </section>
</template>

<script>
import trackCard from '~/components/TrackCard.vue'

export default {
  components: {
    'track-card': trackCard,
  },
  data() {
    return {
      query: '',
      isPicked: false,
      artist: '',
      track: '',
      trackDuration: '',
      album: '',
      tags: [],
      tracks: [],
    }
  },
  computed: {
    items: function () {
      return this.tracks
    },
  },
  methods: {
    search() {
      const clientId = '2ca901aa7f24402bb20a5407c3b2dc23'
      const clientSecret = 'd018d095799647d79a3e54f2db701747'
      const results = document.querySelector('.results')
      let self = this
      this.tracks = []

      const getTrackByName = async (query) => {
        query = encodeURI(query)
        const token = await self.$store.dispatch('spotify/getToken', [
          clientId,
          clientSecret,
        ])
        const data = await self.$store.dispatch('spotify/searchTrack', [
          token,
          query,
        ])
        const tracks = data['tracks'].items

        tracks.forEach(async (el) => {
          self.tracks.push({
            artist: el.artists[0].name,
            track: el.name,
            trackDuration: await self.$store.dispatch(
              'timeFormatter',
              el.duration_ms
            ),
            album: el.album.name,
            albumImg: el.album.images[0].url,
          })
        })
      }

      this.query ? getTrackByName(this.query) : false
      setTimeout(this.longTrackNameHandler, 500)
    },

    pick(k) {
      const table = 'music'
      const timestamp = new Date().getTime()
      const target = this.tracks[k]
      this.isPicked = true
      this.tracks = []
      this.tracks.push(target)
    },

    longTrackNameHandler() {
      const trackName = document.querySelectorAll('.track-name')
      trackName.forEach((el) => {
        const elWidth = el.offsetWidth
        const elText = el.innerText
        if (elWidth < elText.length * 8) {
          let newEl = document.createElement('div')
          newEl.classList.add('track-name', 'mrq', 'my-1')
          newEl.innerText = el.innerText
          let wrp = document.createElement('div')
          wrp.classList.add('track-name_wrapper')
          wrp.append(newEl)
          el.parentElement.insertBefore(wrp, el)
          el.remove()
        }
      })
    },
  },
  mounted() {},
}
</script>

<style lang="scss">
.search {
  max-width: 576px;
  h1 {
    margin: 1rem 0;
  }
  input {
    width: 66.7%;
    border: none;
    border-radius: 6px;
    padding: .25rem .5rem;
    appearance: none;
    outline: none;
    margin-bottom: .25rem;
  }
  span {
    display: block;
    font-size: .75rem;
    opacity: .5;
    margin-bottom: 1.25rem;
  }
  .input-file {
    input {
      width: 0;
      position: absolute;
      left: 0;
    }
    label {
      margin: 0;
    }
  }
}

.track-card {
  max-width: 480px;
  &:not(:first-of-type) {
    margin-top: .5rem;
  }
}

</style>