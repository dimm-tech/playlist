<template>
  <section class="search">
    <h3>Choose a file</h3>
    <input id="file" type="file" @change="getTrackDuration" />

    <h3>search for track info</h3>
    <input type="text" v-model="query" @input="search" />
    <ul class="results" v-if="!isPicked">
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
    </ul>

    <div class="picked"  v-if="isPicked">
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

      e.target.value && getTrackByName(this.query)
    },
    pick(k) {
      const table = 'music'
      const timestamp = new Date().getTime()
      const target = this.tracks[k]
      this.isPicked = true
      this.tracks = []
      this.tracks.push(target)
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
    artist: { required },
    track: { required },
    file: { required },
  },
  mounted() {},
}
</script>

<style lang="scss">
.search {
  p {
    font-size: 0.65rem;
  }
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
  .picked {
    display: flex;
    flex-wrap: nowrap;
    margin: 2rem 0;
    img {
      width: 50%;
      margin-right: 2rem;
    }
  }
  .addForm {
    display: flex;
    flex-direction: column;
    width: 100%;
    .invalid {
      border-bottom: 1px solid red;
    }
    .tags {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      span {
        cursor: pointer;
      }
      .addTag {
        position: absolute;
        bottom: 1rem;
        right: 4px;
      }
      .tag {
        margin: 4px;
        padding: 4px 8px;
        border: 1px solid grey;
        border-radius: 4px;
        .delTag {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>