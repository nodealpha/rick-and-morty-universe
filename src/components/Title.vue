<template>
  <div class="comp-title" v-if="type === 'h1'">
    <h1>
      <slot />
    </h1>
  </div>
  <div class="comp-title" v-else-if="type === 'h2'">
    <h2>
      <slot />
    </h2>
  </div>
  <div class="comp-title" v-else-if="type === 'h3'">
    <h3>
      <slot />
    </h3>
  </div>
  <div class="comp-title" v-else-if="type === 'h4'">
    <h4>
      <slot />
    </h4>
  </div>
  <div class="comp-title" v-else-if="type === 'h5'">
    <h5>
      <slot />
    </h5>
  </div>
  <div class="comp-title" v-else>
    <h6>
      <slot />
    </h6>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    type: {
      type: String,
      default: 'h1'
    }
  }
}
</script>

<style>
  .comp-title {
    font-weight: 600;
    color: #080022;
  }
  .comp-title h1 {
    font-size: 24px;
  }
  .comp-title h2 {
    font-size: 20px;
  }
  .comp-title h3 {
    font-size: 18px;
  }
  .comp-title h4 {
    font-size: 16px;
  }
  .comp-title h5 {
    font-size: 14px;
  }
  .comp-title h6 {
    font-size: 12px;
  }
</style>
