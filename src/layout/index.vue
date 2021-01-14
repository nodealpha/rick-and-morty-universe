<template>
  <div id="app">
    <Header />
    <div class="wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>
import Header from './Header'

export default {
  name: 'AppLayout',
  components: {
    Header
  }
}
</script>
