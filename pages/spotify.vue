<template>
  <section class="search">
    <h3>Choose a file</h3>
    <input id="file" type="file" @change="getTrackDuration" />

    <h3>search for track info</h3>
    <input type="text" v-model="query" @input="search" />
    <ul class="results"></ul>

    <form class="add" v-if="isPicked">
      <label for="artist">Исполнитель</label>
      <input
        id="artist"
        type="text"
        v-model.trim="artist"
        :class="{
          invalid:
            ($v.artist.$dirty && !$v.artist.required) ||
            ($v.artist.$dirty && !$v.artist.minLength),
        }"
      />
      <small v-if="$v.artist.$dirty && !$v.artist.required"
        >заполните это поле</small
      >
      <small v-if="$v.artist.$dirty && !$v.artist.minLength"
        >не меньше двух символов</small
      >
      <label for="track">Композиция</label>
      <input
        id="track"
        type="text"
        v-model.trim="track"
        :class="{
          invalid:
            ($v.track.$dirty && !$v.track.required) ||
            ($v.track.$dirty && !$v.track.minLength),
        }"
      />
      <small v-if="$v.track.$dirty && !$v.track.required"
        >заполните это поле</small
      >
      <small v-if="$v.track.$dirty && !$v.track.minLength"
        >не меньше двух символов</small
      >
      <label for="album">Альбом</label>
      <input
        id="album"
        type="text"
        v-model.trim="album"
        :class="{
          invalid:
            ($v.track.$dirty && !$v.track.required) ||
            ($v.track.$dirty && !$v.track.minLength),
        }"
      />
      <small v-if="$v.track.$dirty && !$v.track.required"
        >заполните это поле</small
      >
      <small v-if="$v.track.$dirty && !$v.track.minLength"
        >не меньше двух символов</small
      >
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

    <button class="toDB">to DataBase</button>
  </section>
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
    }
  },
  methods: {
    getTrackDuration(e) {
      this.trackDuration = this.$store.dispatch(
        'trackDurationFromInput',
        e.target
      )
    },
    search(e) {
      const clientId = '2ca901aa7f24402bb20a5407c3b2dc23'
      const clientSecret = 'd018d095799647d79a3e54f2db701747'
      const results = document.querySelector('.results')

      results.innerHTML = ''

      const _getToken = async () => {
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

      const _getTrackByName = async (token, query) => {
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
        const token = await _getToken()
        const data = await _getTrackByName(token, query)
        const tracks = data['tracks'].items

        tracks.forEach(async (el) => {
          let trackInfo = {
            track: el.name,
            artist: el.artists[0].name,
            album: el.album.name,
            albumImg: el.album.images[0].url,
            trackDuration: await this.$store.dispatch(
              'timeFormatter',
              el.duration_ms
            ),
          }

          let result = renderDOM(trackInfo)
          results.append(result)
          result.onclick = () => {
            pick(trackInfo)
          }
        })
      }

      const renderDOM = (trackInfo) => {
        let item = document.createElement('li')
        item.classList.add('result')

        item.innerHTML = `
          <div class="result-wrapper">
            <img class="album-img" src="${trackInfo.albumImg}" />
            <div class="result__info">
              <div class="track-name">${trackInfo.track}</div>
              <div class="artist-name">${trackInfo.artist}</div>
            </div>
          </div>
          <div>${trackInfo.trackDuration}</div>
        `
        return item
      }

      const pick = (trackInfo) => {
        const table = 'music'
        const timestamp = new Date().getTime()
        const item = renderDOM(trackInfo)

        results.innerHTML = ''
        results.append(item)
        this.artist = trackInfo.artist
        this.track = trackInfo.track
        this.album = trackInfo.album
        this.isPicked = true

        // document.querySelector('#file').addEventListener('change', (e) => {
        //   jsmediatags.read(document.querySelector('#file').files[0], {
        //     onSuccess: function (tag) {
        //       console.log(tag)
        //     },
        //     onError: function (error) {
        //       console.log(':(', error.type, error.info)
        //     },
        //   })
        // })

        document.querySelector('.toDB').onclick = () => {
          let file = document.querySelector('#file').files[0]

          this.$store.dispatch('infoToDB', [table, timestamp, trackInfo])
          this.$store.dispatch('fileToDB', [table, timestamp, file])
        }
      }
      e.target.value && getTrackByName(this.query)
    },
    addTag(e) {
      console.log(e.target.parentNode.querySelector('input').value)
      this.tags.push(e.target.parentNode.querySelector('input').value)
      e.target.parentNode.querySelector('input').value = ''
    },
    delTag(e) {
      const val = e.target.parentNode.querySelector('.tagVal').innerText
      let mrk = this.tags.indexOf(val, 0)
      this.tags.splice(mrk, 1)
    },
  },
  validations: {
    artist: { required, minLength: 2 },
    track: { required, minLength: 2 },
    file: { required },
  },
  mounted() {},
}
</script>

<style lang="scss">
.search {
  #file {
    border: none;
    margin-bottom: 1rem;
  }
  .results {
    .result {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      &:hover {
        border: 2px solid greenyellow;
      }
      &-wrapper {
        display: flex;
        align-items: center;
      }
      .album-img {
        width: 64px;
        margin-right: 1rem;
      }
      .track-name {
        font-weight: 500;
      }
    }
  }
  p {
    font-size: 0.65rem;
  }
}
</style>