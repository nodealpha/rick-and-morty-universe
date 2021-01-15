<template>
  <div class="view-character">
    <div class="loading" v-if="loading">
      Loading character...
    </div>
    <div class="container" v-else>
      <div class="title"><span>I'm</span>{{ character.name }}</div>
      <div class="avatar">
        <img :src="character.image" alt="">
      </div>
      <div class="details">
        <div class="status" v-bind:class="{active: isAlive}">{{ character.status }}</div>
        <div class="split-view">
          <div class="split-view-i pairs">
            <div class="key">Created on</div>
            <div class="value">{{ createdOn }}</div>
          </div>
          <div class="split-view-i pairs">
            <div class="key">Gender</div>
            <div class="value">{{ character.gender }}</div>
          </div>
          <div class="split-view-i pairs">
            <div class="key">Species</div>
            <div class="value">{{ character.species }}</div>
          </div>
          <div class="split-view-i pairs">
            <div class="key">Location</div>
            <div class="value">{{ character.location.name }}</div>
          </div>
        </div>
        <div class="episode">
          <div class="title">Episodes</div>
          <div v-if="loadingEpisodes" class="loading">Loading episodes....</div>
          <div v-for="episode in episodes" class="episode-i" :key="episode.id" v-else>
            <Episode :data="episode" />
          </div>
        </div>
      </div>
    </div>
    <div class="back">
      <button @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import { datetime } from '@/config'
import CharacterService from '@/services/character.js'
import Episode from '@/components/Episode.vue'

export default {
  components: {
    Episode
  },
  data () {
    return {
      loading: false,
      loadingEpisodes: false,
      character: {},
      episodes: []
    }
  },
  computed: {
    isAlive: vm => vm.character.status === 'Alive',
    createdOn: vm => moment(vm.character.created).format(datetime.FORMAT_DATE)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    async getCharacter () {
      try {
        this.loading = true
        this.character = await CharacterService.get(this.$route.params.id)
      } catch (err) {
        console.error('err', err)
      } finally {
        this.loading = false
      }
    },
    async getEpisodes () {
      if (!this.character) {
        return
      }
      try {
        this.loadingEpisodes = true
        const episodes = this.character.episode
        for (let i = 0; i < episodes.length; i++) {
          const episodeId = episodes[i].split('/').pop()
          const episode = await CharacterService.getEpisode(episodeId)
          this.episodes.push(episode)
        }
      } catch (err) {
        console.error('err', err)
      } finally {
        this.loadingEpisodes = false
      }
    }
  },
  async created () {
    await this.getCharacter()
    await this.getEpisodes()
  }
}
</script>

<style>
  .view-character {
    background-color: #e6dfdf;
    padding: 100px 0;
    position: relative;
  }

  .view-character > .loading {
    padding-left: 50px;
    font-size: 16px;
    font-weight: normal;
  }

  .view-character .container {
    display: flex;
    align-items: center;
    position: relative;
  }

  .view-character .container > .title {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    font-size: 36px;
    line-height: 1.3;
    padding-left: 50px;
    position: relative;
  }
  .view-character .container > .title span {
    position: absolute;
    top: 0;
    left: 50px;
    opacity: 0.2;
    transform: translate(0, -100%);
    font-style: italic;
    font-size: 40px;
    font-weight: 900;
  }

  .view-character .container .avatar {
    width: 300px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-right: -36px;
    border-radius: 5px;
    overflow: hidden;
  }

  .view-character .container .avatar img {
    width: 100%;
  }

  .view-character .details {
    flex-grow: 1;
    background-color: #fff;
    min-height: 500px;
    padding: 24px;
    padding-left: 76px;
  }
  .view-character .details .status {
    display: inline-block;
    background-color: #aaa;
    padding: 0 8px;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    border-radius: 10px;
  }
  .view-character .details .status.active {
    background-color: #00da4d;
    color: #000;
  }

  .view-character .back {
    position: absolute;
    top: 24px;
    left: 50px;
  }

  .view-character .back button {
    background-color: transparent;
    border: 0;
    outline: 0;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .view-character .details .split-view {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 36px;
    grid-row-gap: 24px;
  }
  .view-character .details .pairs .key {
    font-size: 14px;
    color: royalblue;
    margin-bottom: 8px;
  }
  .view-character .details .pairs .value {
    font-size: 14px;
    color: #9290ad;
  }
  .view-character .details .location {
    margin-top: 24px;
  }
  .view-character .details .episode {
    margin-top: 40px;
  }
  .view-character .details .episode > .title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  .view-character .details .episode .episode-i:not(:last-child) {
    margin-bottom: 24px;
  }
</style>
