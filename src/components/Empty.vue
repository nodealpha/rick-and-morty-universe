<template>
  <div class="comp-empty">
    <div class="icon-wrap"><i class="fas fa-exclamation-triangle"></i></div>
    <div class="label">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'No data exist'
    }
  }
}
</script>

<style>
  .comp-empty {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: inherit;
    height: 100%;
    font-size: 16px;
    font-weight: normal;
    color: #585858;
    border: 1px solid #e5e5e5;
    padding: 24px;
    border-radius: 5px;
    background-color: #f4f4f4;
  }
  .comp-empty .icon-wrap {
    margin-right: 16px;
    color: #F57C00;
  }
</style>
