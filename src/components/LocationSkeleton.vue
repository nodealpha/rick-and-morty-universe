<template>
  <div class="comp-location-skeleton">
      <div class="title"></div>
      <div class="sub-title"></div>
      <div class="data-wrap">
        <div class="data"></div>
        <div class="data"></div>
        <div class="data"></div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
  .comp-location-skeleton {
    width: 300px;
    height: auto;
    background-color: #f4f4f4;
    border-radius: 5px;
    padding: 24px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.07);
  }
  .comp-location-skeleton .title {
    width: 80%;
    height: 20px;
    background-color: #e6e6e6;
    border-radius: 10px;
  }
  .comp-location-skeleton .sub-title {
    width: 50%;
    height: 10px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin-top: 16px;
  }
  .comp-location-skeleton .data-wrap {
    margin-top: 36px;
    margin-bottom: 16px;
  }
  .comp-location-skeleton .data {
    width: 100%;
    height: 10px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin-top: 16px;
  }
</style>
