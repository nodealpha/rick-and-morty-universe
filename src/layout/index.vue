<template>
  <div id="app">
    <div class="wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>

export default {
  name: 'AppLayout',
  components: {
  }
}
</script>
