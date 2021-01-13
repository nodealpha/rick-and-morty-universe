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
          <div class="title">
            {{ data.name.trim() }}
          </div>
          <div class="sub-title-wrap">
            <div class="sub-title">
              {{ data.gender }}
            </div>
          </div>
        </div>
      </div>
      <div class="action">
        <button @click="onClickView">View</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
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

  .comp-character .title-wrap .title {
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 20px;
  }

  .comp-character .title-wrap .sub-title-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  }

  .comp-character .title-wrap .sub-title {
    font-size: 14px;
    font-weight: normal;
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
    margin-top: 16px;
  }
  .comp-character .action button {
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #0d54f5;
    outline: 0;
    line-height: 30px;
    font-size: 14px;
    font-weight: 600;
    padding: 0 16px;
    border-radius: 5px;
    color: #0d54f5;
    text-transform: uppercase;
  }
</style>
