<template>
  <div class="comp-location">
    <div v-if="data.name" class="title">{{ data.name }}</div>
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

import { datetime } from '@/config'

export default {
  name: 'Location',
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
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 24px;
    background-color: #f9f9f9;
  }
  .comp-location .title {
    font-size: 16px;
    font-weight: 600;
  }
  .comp-location .sub-title {
    font-size: 14px;
    font-weight: normal;
    color: #9290ad;
    margin-top: 5px;
  }

  .comp-location .pairs {
    margin-top: 16px;
  }
  .comp-location .pairs .key {
    font-size: 12px;
    font-weight: 600;
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
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    line-height: 1;
    font-weight: 600;
    color: #0d54f5;
    text-transform: uppercase;
  }
</style>
