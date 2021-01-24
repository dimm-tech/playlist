<template>
  <b-container class="search" fluid="xl" tag="section">
    <h1 class="py-3">search for track info</h1>
    <!-- <input type="text" v-model="query" @input="search" /> -->
    <b-form-group>
      <b-form-input
        id="search-query"
        v-model="query"
        @input="search"
      ></b-form-input>
      <b-form-text>artist or track name</b-form-text>
    </b-form-group>

    <!-- <ul class="results" v-if="!isPicked">
      <li
        class="result"
        v-for="(trackInfo, k) in tracks"
        :key="k"
        @click="pick(k)"
      >
        <div class="result-wrapper">
          <img class="album-img" :src="trackInfo.albumImg" />
          <div class="result__info">
            <div class="track-name">{{ trackInfo.track }}</div>
            <div class="artist-name">{{ trackInfo.artist }}</div>
          </div>
        </div>
        <div>{{ trackInfo.trackDuration }}</div>
      </li>
    </ul> -->
    <b-col md="8 px-0">
      <b-card
        class="mb-2"
        no-body
        bg-variant="transparent"
        v-for="(trackInfo, k) in items"
        :key="k"
      >
        <b-row no-gutters>
          <b-col cols="3" sm="2">
            <b-card-img :src="trackInfo.albumImg"></b-card-img>
          </b-col>
          <b-col cols="9" sm="10" class="pl-3 pr-1">
            <b-card-title
              class="track-name overflow-hidden my-1"
              title-tag="p"
              >{{ trackInfo.track }}</b-card-title
            >
            <b-card-sub-title sub-title-tag="p">{{
              trackInfo.artist
            }}</b-card-sub-title>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <section class="picked" v-if="isPicked">
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
    </section>
    <b-badge class="mb-2" variant="dark">file</b-badge>
    <div class="input-file">
      <input id="file" type="file" @change="getTrackDuration" />
      <b-btn size="sm" variant="primary">
        <label for="file">choose a file...</label>
      </b-btn>
    </div>
  </b-container>
</template>

<script>
import '~/plugins/vuelidate.js'
import { required, minLength } from 'vuelidate/lib/validators'
import jsmediatags from 'jsmediatags'
export default {
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
    getTrackDuration(e) {
      this.trackDuration = this.$store.dispatch(
        'trackDurationFromInput',
        e.target
      )
    },
    search() {
      const clientId = '2ca901aa7f24402bb20a5407c3b2dc23'
      const clientSecret = 'd018d095799647d79a3e54f2db701747'
      const results = document.querySelector('.results')
      let self = this
      this.tracks = []

      const _getTokenSpotify = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
          },
          body: 'grant_type=client_credentials',
        })
        const data = await result.json()

        return data.access_token
      }

      const _searchTrackSpotify = async (token, query) => {
        const result = await fetch(
          `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`,
          {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + token },
          }
        )
        const data = await result.json()

        return data
      }

      const getTrackByName = async (query) => {
        query = encodeURI(query)
        const token = await _getTokenSpotify()
        const data = await _searchTrackSpotify(token, query)
        const tracks = data['tracks'].items
        tracks.forEach(async (el) => {
          self.tracks.push({
            artist: el.artists[0].name,
            track: el.name,
            trackDuration: await this.$store.dispatch(
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
  validations: {
    artist: { required },
    track: { required },
    file: { required },
  },
  mounted() {},
}
</script>

<style lang="scss">
.search {
  .track-name {
    white-space: nowrap;
    &_wrapper {
      overflow: hidden;
    }
  }
  .mrq {
    animation: toLeft 5s linear 1 forwards, fromRight 5s linear 5s infinite;
  }

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
</style>