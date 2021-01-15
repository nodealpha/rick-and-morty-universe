<template>
  <div class="comp-character">
    <div class="avatar">
      <img :src="data.image" alt="">
    </div>
    <div class="badge" v-bind:class="[{ active: isAlive }]">
      {{ data.status }}
    </div>
    <div class="container">
      <div class="head">
        <div class="title-wrap">
          <Title :type="'h4'">{{ data.name.trim() }}</Title>
          <div class="sub-title">{{ data.gender }}</div>
        </div>
      </div>
      <div class="action">
        <button @click="onClickView">View</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'

export default {
  name: 'Character',
  components: {
    Title
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    isAlive: vm => vm.data.status === 'Alive',
    gender: vm => (vm.data.gender.toLowerCase() !== 'unknown' && vm.data.gender) || ''
  },
  methods: {
    onClickView () {
      this.$router.push(`/character/${this.data.id}`)
    }
  }
}
</script>

<style>
  .comp-character {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    padding-bottom: 70px;
  }
  .comp-character .avatar {
    width: 100%;
    height: 150px;
    overflow: hidden;
  }

  .comp-character .badge {
    font-size: 10px;
    font-weight: 600;
    background-color: #aaa;
    line-height: 16px;
    padding: 0 8px;
    display: inline-flex;
    color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 8px;
    left: 8px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    text-transform: capitalize;
  }
  .comp-character .badge.active {
    background-color: #00da4d;
    color: #000;
  }

  .comp-character .container {
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .comp-character .head {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .comp-character .avatar img {
    width: 100%;
  }

  .comp-character .title-wrap .comp-title {
    text-align: center;
    line-height: 1.5;
  }

  .comp-character .title-wrap .sub-title {
    font-size: 14px;
    font-weight: normal;
    font-weight: 600;
    color: #808080;
    text-align: center;
    margin-top: 8px;
  }
  .comp-character .title-wrap .sub-title:not(:last-child) {
    margin-right: 16px;
    position: relative;
  }
  .comp-character .title-wrap .sub-title:not(:last-child)::after {
    content: '';
    width: 5px;
    height: 5px;
    background-color: #aaa;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translate(50%, -25%);
  }

  .comp-character .action {
    width: 100%;
    margin-top: 16px;
    position: absolute;
    bottom: 24px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comp-character .action button {
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #1565C0;
    outline: 0;
    line-height: 30px;
    font-size: 14px;
    font-weight: 600;
    padding: 0 16px;
    border-radius: 5px;
    color: #1565C0;
    text-transform: uppercase;
  }
  .comp-character .action button:hover {
    background-color: #1565C0;
    color: #fff;
  }
</style>
