<template>
  <div class="comp-spinner">
    <i class="fas fa-spinner"></i>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style>
  .comp-spinner {
    animation: spin 1s infinite linear;
  }
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
