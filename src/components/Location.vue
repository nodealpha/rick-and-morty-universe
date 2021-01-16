<template>
  <div class="comp-location">
    <div v-if="data.name" class="title-wrap">
      <Title :type="'h2'">{{ data.name }}</Title>
    </div>
    <div class="sub-title">{{ data.type }}</div>
    <div class="pairs">
      <div class="key">Created on</div>
      <div class="value">{{created}}</div>
    </div>
    <div class="pairs">
      <div class="key">Total residents</div>
      <div class="value">{{data.residents.length}}</div>
    </div>
    <div class="pairs">
      <div class="key">Dimension</div>
      <div class="value">{{data.dimension}}</div>
    </div>
    <div class="link-btn">
      <button @click="$emit('click', data)">View residents</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import Title from '@/components/Title.vue'

import { datetime } from '@/config'

export default {
  name: 'Location',
  components: {
    Title
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  computed: {
    created: vm => moment(vm.data.created).format(datetime.FORMAT_DATE)
  }
}
</script>

<style>
  .comp-location {
    width: 100%;
    min-height: 50px;
    border-radius: 3px;
    padding: 24px;
    background-color: #f9f9f9;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }
  .comp-location .sub-title {
    font-size: 14px;
    font-weight: normal;
    color: #616161;
    margin-top: 5px;
  }

  .comp-location .pairs {
    margin-top: 16px;
  }
  .comp-location .pairs .key {
    font-size: 12px;
    font-weight: 600;
    color: #616161;
  }
  .comp-location .pairs .value {
    font-size: 14px;
    margin-top: 8px;
    text-transform: capitalize;
  }

  .comp-location .link-btn {
    margin-top: 24px;
  }

  .comp-location .link-btn button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
    line-height: 1.5;
    font-weight: 600;
    color: #1565C0;
    text-transform: uppercase;
    transition: margin .1s ease;
  }
  .comp-location .link-btn button:hover {
    color: #FF9100;
    margin-left: 3px;
  }
</style>
