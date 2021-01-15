<template>
  <div class="comp-episode-skeleton">
      <div class="title"></div>
      <div class="sub-title"></div>
      <div class="sub-title"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
  .comp-episode-skeleton {
    width: 100%;
    height: auto;
  }
  .comp-episode-skeleton .content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .comp-episode-skeleton .title {
    width: 70%;
    height: 15px;
    background-color: #e6e6e6;
    border-radius: 10px;
  }
  .comp-episode-skeleton .sub-title {
    width: 50%;
    height: 10px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin-top: 16px;
  }
</style>
