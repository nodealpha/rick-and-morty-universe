<template>
  <div class="comp-character-skeleton">
      <div class="avatar"></div>
      <div class="content">
        <div class="title"></div>
        <div class="sub-title"></div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
  .comp-character-skeleton {
    width: 100%;
    height: auto;
    background-color: #f4f4f4;
    border-radius: 5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.07);
  }
  .comp-character-skeleton .avatar {
    height: 150px;
    background-color: #e6e6e6;
  }
  .comp-character-skeleton .content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .comp-character-skeleton .title {
    width: 80%;
    height: 20px;
    background-color: #e6e6e6;
    border-radius: 10px;
  }
  .comp-character-skeleton .sub-title {
    width: 50%;
    height: 10px;
    background-color: #e6e6e6;
    border-radius: 5px;
    margin-top: 16px;
  }
</style>
