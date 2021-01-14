<template>
  <div class="modal" id="Modal" @click="onClickOverlay" >
    <div class="modal-container"><slot></slot></div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickOverlay (e) {
      const parent = document.getElementById('Modal')
      if (e.target === parent) {
        this.$emit('close')
      }
    }
  },
  created () {
    document.body.style.overflow = 'hidden'
  },
  destroyed () {
    document.body.style.overflow = 'visible'
  }
}
</script>

<style>
  .modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .modal .modal-container {
    min-width: 300px;
    min-height: 150px;
    max-height: 80%;
    background-color: #FFF;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    overflow: auto;
  }
</style>
