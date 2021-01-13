<template>
  <div class="root">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="container" v-else>
      <div class="title">Locations ({{ locations.length }})</div>
      <div class="locations">
        <div class="location" v-for="location in locations" :key="location.name">
          <Location :data="location" v-on:click="onLocationClick" />
        </div>
      </div>
      <div v-if="showModal" class="modal-wrap">
        <Modal v-on:close="closeModal">
          <div class="characters">
            <div class="loading" v-if="modalLoading">
              Loading characters...
            </div>
            <div class="character-wrap" v-else>
              <div class="character" v-for="char in characters" :key="char.id">
                <Character :data="char" />
              </div>
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
import Modal from '@/components/Modal.vue'
import Character from '@/components/Character.vue'

export default {
  name: 'Home',
  components: {
    Modal,
    Location,
    Character
  },

  data () {
    return {
      loading: false,
      modalLoading: false,
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
        this.characters = chars
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
  .root > .loading {
    font-size: 16px;
    font-weight: 400;
    padding: 0 24px 30px;
  }

  .root .container > .title {
    font-size: 20px;
    font-weight: 700;
    padding: 0 24px 30px;
  }

  .locations {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 16px;
    padding: 0 24px;
    margin-bottom: 50px;
  }

  .characters {
    width: 700px;
    min-height: inherit;
  }
  .characters .character-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
    padding: 24px;
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
