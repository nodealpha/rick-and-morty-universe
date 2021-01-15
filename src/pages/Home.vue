<template>
  <div class="root">
    <div class="container">
      <div class="title-wrap">
        <Title :type="'h3'">
          <div class="icon-wrap">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          Locations {{ locations.length ? `(${locations.length})` : ''}}
        </Title>
      </div>
      <div class="locations" v-if="locations.length">
        <div class="location" v-for="location in locations" :key="location.name">
          <Location :data="location" v-on:click="onLocationClick" />
        </div>
      </div>
      <div class="location-skeleton" v-if="loading">
        <div class="skeleton-i">
          <LocationSkeleton />
        </div>
        <div class="skeleton-i">
          <LocationSkeleton />
        </div>
        <div class="skeleton-i">
          <LocationSkeleton />
        </div>
      </div>
      <div class="location-not-found" v-if="locations.length === 0 && !loading"><Empty :text="'No location exist'" /></div>

      <div v-if="showModal" class="modal-wrap">
        <Modal v-on:close="closeModal">
          <div class="characters">
            <div class="head">
              <Title :type="'h3'">
                <div class="icon-wrap"><i class="fas fa-users"></i></div>
                Characters
              </Title>
            </div>
            <div class="character-wrap" v-if="characters.length">
              <div class="character" v-for="char in characters" :key="char.id">
                <Character :data="char" />
              </div>
            </div>
            <div class="character-not-found" v-else-if="characters.length === 0 && !modalLoading"><Empty :text="'No characters exist'" /></div>
            <div class="character-loading" v-if="modalLoading">
              <div class="skeleton-i"><CharacterSkeleton /></div>
              <div class="skeleton-i"><CharacterSkeleton /></div>
              <div class="skeleton-i"><CharacterSkeleton /></div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import LocationService from '@/services/location.js'
import CharacterService from '@/services/character.js'

import Location from '@/components/Location.vue'
import Title from '@/components/Title.vue'
import Empty from '@/components/Empty.vue'
import LocationSkeleton from '@/components/LocationSkeleton.vue'
import CharacterSkeleton from '@/components/CharacterSkeleton.vue'
import Modal from '@/components/Modal.vue'
import Character from '@/components/Character.vue'

export default {
  name: 'Home',
  components: {
    Title,
    Empty,
    LocationSkeleton,
    CharacterSkeleton,
    Modal,
    Location,
    Character
  },

  data () {
    return {
      loading: false,
      modalLoading: true,
      showModal: false,
      locations: [],
      characters: []
    }
  },

  methods: {
    async fetchLocations () {
      this.loading = true
      try {
        const { results } = await LocationService.get()
        if (!results) {
          console.error('Unable to fetch locations')
        }
        this.locations = results
      } catch (err) {
        console.error('err', err)
      } finally {
        this.loading = false
      }
    },
    async onLocationClick (location) {
      this.showModal = true
      try {
        this.modalLoading = true
        const residents = location.residents
        const chars = []
        for (let i = 0; i < residents.length; i++) {
          const resident = residents[i]
          if (!resident) {
            return
          }
          const charId = resident.split('/').pop()
          const char = await CharacterService.get(charId)
          chars.push(char)
        }
        this.characters = [...chars]
      } catch (err) {
        console.error('err', err)
      } finally {
        this.modalLoading = false
      }
    },
    closeModal () {
      if (this.modalLoading) return
      this.characters = []
      this.showModal = false
    }
  },

  created () {
    this.fetchLocations()
  }
}
</script>

<style>
  .root .container > .title-wrap {
    padding: 0 24px 30px;
    display: flex;
    align-items: flex-end;
  }
  .root .container .title-wrap .spinner-wrap {
    margin-left: 8px;
    font-size: 12px;
  }
  .root .container > .title-wrap .comp-title > * {
    display: flex;
  }
  .root .container > .title-wrap .comp-title .icon-wrap {
    margin-right: 8px;
    color: #F44336;
  }

  .root .container .locations {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 16px;
    padding: 0 24px;
    margin-bottom: 50px;
  }
  .location-not-found {
    width: 400px;
    margin: 0 auto;
  }
  .location-skeleton {
    margin: 0 24px;
    display: flex;
    align-items: center;
  }
  .location-skeleton .skeleton-i:not(:last-child) {
    margin-right: 24px;
  }

  .characters {
    width: 700px;
    min-height: 300px;
  }
  .characters > .head {
    padding: 24px;
    position: relative;
  }
  .characters > .head:after {
    content: '';
    width: 100%;
    height: 5px;
    background-color: #8BC34A;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .characters > .head .comp-title > * {
    display: flex;
    align-items: center;
  }
  .characters > .head .comp-title .icon-wrap {
    margin-right: 8px;
    color: #558B2F;
  }
  .characters .character-wrap, .character-loading {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
    padding: 24px;
  }
  .characters .character-not-found {
    width: 80%;
    margin: 50px auto 0;
  }
  .characters .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    min-height: inherit;
  }
</style>
