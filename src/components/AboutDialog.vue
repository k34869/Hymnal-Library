<template>
  <div class="container">
    <div class="logo">
      <img src="/resources/logo/logo-full.png" />
    </div>
    <div class="content">
      <p>软件版本：{{ appInfo.version }}</p>
      <p>作者：k34869</p>
      <p>邮箱：build17293@gmail.com</p>
      <p>资料库来源：<a href="https://mygoodland.notion.site/">https://mygoodland.notion.site/</a></p>
      <p>界面风格：Material Design 3</p>
    </div>
    <p>本软件资料库数据来源于 https://mygoodland.notion.site，有任何问题可以通过邮箱向我反馈</p>
    <br>
    <p>如果你觉得这个软件对你有帮助，可以给作者一点捐赠😄</p>
    <div class="pay-qr-code">
      <img src="/resources/pay-qr-code.jpg" />
    </div>
  </div>
</template>

<script setup>
import { appInfo } from '~/stores/appInfo';
</script>

<style scoped>
.logo {
  text-align: center;
  padding: 15px 0;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: var(--mdui-elevation-level2);
  }
}

.pay-qr-code {
  padding: 10px 0;
  text-align: center;

  img {
    @apply w-full h-full;
    border-radius: 10px;
  }
}

.content {
  user-select: text;
  margin: 12px 10px;

  p {
    line-height: 28px;
    color: rgb(var(--mdui-color-on-surface-variant));
  }
}
</style>