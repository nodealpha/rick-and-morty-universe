<template>
  <div class="comp-episode">
    <div class="title">{{ data.name }}</div>
    <div class="sub-title">Created on <b>{{ createdOn }}</b></div>
    <div class="sub-title">Air on <b>{{ data.air_date }}</b></div>
  </div>
</template>

<script>
import moment from 'moment'

// import { datetime } from '@/config'

export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    createdOn: vm => moment(vm.created).format('MMMM DD, YYYY')
  }
}
</script>

<style>
.comp-episode > .title {
  font-size: 14px;
  font-weight: 600;
}
.comp-episode .sub-title {
  font-size: 14px;
  margin-top: 8px;
}
.comp-episode .sub-title b {
  font-weight: 600;
  font-style: italic;
}
</style>
