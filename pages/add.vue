<template>
  <section class="edit">
    <h1>new track</h1>
    <form class="add">
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
      <label for="file">Файл</label>
      <input
        id="file"
        type="file"
        placeholder="Файл"
        class="file"
        @change="file = 1"
        :class="{ invalid: $v.file.$dirty && !$v.file.required }"
      />
      <small v-if="$v.file.$dirty && !$v.file.required">выберите файл</small>
      <div class="tags">
        <label for="tags">Тэги</label>
        <input id="tags" type="text" />
        <span class="addTag" @click="addTag">+</span>
        <div class="tag" v-for="tag in tags" :key="tag.id">
          <span class="tagVal">{{ tag }}</span>
          <span class="delTag" @click="delTag">-</span>
        </div>
      </div>
      <button @click.prevent="trackDuration">add to database</button>
    </form>
    <h2>{{ artist }}</h2>
  </section>
</template>

<script>
import { storage } from '~/plugins/firebase.js'
import '~/plugins/vuelidate.js'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      artist: '',
      track: '',
      file: '',
      tags: [],
    }
  },
  computed: {},
  methods: {
    add() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const table = 'music'
      const timestamp = new Date().getTime()
      let file = document.querySelector('.file').files[0]
      storage
        .ref(`${table}/${timestamp}`)
        .put(file)
        .then(() => {
          storage
            .ref(`${table}/${timestamp}`)
            .getDownloadURL()
            .then((url) => {
              this.file = url
            })
            .then(() => {
              this.$store.dispatch('infoToDB', [
                table,
                timestamp,
                {
                  artist: this.artist,
                  track: this.track,
                  file: this.file,
                  tags: this.tags,
                },
              ])
              this.artist = ''
              this.track = ''
              this.file = ''
              this.tags = ''
            })
        })
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
    trackDuration() {
      this.$store.dispatch('trackDurationFromInput', document.querySelector('#file'))
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

</style>
