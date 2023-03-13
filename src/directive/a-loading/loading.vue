<!--
    @createTime: 3/13/23
    @author: aaron
    @desc: loading
    @update: 3/13/23
-->
<template>
  <div id="loading" class="init-loading" v-if="visible">
    <div class="init-loading-spinner">
      <div class="init-loading-spinner-container">
        <div class="init-loading-spinner-nib init-loading-spinner-nib-1"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-2"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-3"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-4"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-5"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-6"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-7"></div>
        <div class="init-loading-spinner-nib init-loading-spinner-nib-8"></div>
      </div>
      <span aria-live="assertive" class="init-loading-spinner-label" role="status">
        正在载入…
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      visible: false,
    }
  }
}
</script>

<style scoped>
.init-loading {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.init-loading-spinner {
  position: relative;
  height: 32px;
  width: 32px;
}

.init-loading-spinner .init-loading-spinner-container {
  position: absolute;
  top: 50%;
  width: 0;
  z-index: 1;
  transform: scale(.15);
  right: 50%;
}

.init-loading-spinner .init-loading-spinner-nib {
  height: 28px;
  position: absolute;
  top: -12.5px;
  width: 66px;
  background: transparent;
  border-radius: 25%/50%;
  transform-origin: right center;
}

.init-loading-spinner .init-loading-spinner-nib:before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  background: #000;
  border-radius: 25%/50%;
  animation-direction: normal;
  animation-duration: .8s;
  animation-fill-mode: none;
  animation-iteration-count: infinite;
  animation-name: init-loading-spinner-line-fade-default;
  animation-play-state: running;
  animation-timing-function: linear;
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-1 {
  transform: rotate(0deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-1:before {
  animation-delay: -.8s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-2 {
  transform: rotate(-45deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-2:before {
  animation-delay: -.7s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-3 {
  transform: rotate(-90deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-3:before {
  animation-delay: -.6s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-4 {
  transform: rotate(-135deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-4:before {
  animation-delay: -.5s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-5 {
  transform: rotate(-180deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-5:before {
  animation-delay: -.4s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-6 {
  transform: rotate(-225deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-6:before {
  animation-delay: -.3s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-7 {
  transform: rotate(-270deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-7:before {
  animation-delay: -.2s
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-8 {
  transform: rotate(-315deg) translateX(-40px)
}

.init-loading-spinner .init-loading-spinner-nib.init-loading-spinner-nib-8:before {
  animation-delay: -.1s
}

@keyframes init-loading-spinner-line-fade-default {
  0%, to {
    opacity: .55
  }

  95% {
    opacity: .08
  }

  1% {
    opacity: .55
  }
}

.init-loading-spinner .init-loading-spinner-label {
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
  border: 0;
  padding: 0;
}
</style>
