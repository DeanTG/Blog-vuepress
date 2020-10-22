<template>
  <div
    id="box"
    :style="{
      transform:
        'perspective(320px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)',
    }"
    @mousedown="doAnimate"
  >
    <div class="front"></div>
    <div class="back"></div>
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        y: -60,
        x: 45
      }
    },
    mounted() {
    },
    methods: {
      doAnimate(ev) {
        var oEvent=ev||event;
        var disX=oEvent.clientX-this.y;
        var disY=oEvent.clientY-this.x;
        document.onmousemove=(ev)=> {
          var oEvent=ev||event;
          this.x=oEvent.clientY-disY;
          this.y=oEvent.clientX-disX;
        };
        document.onmouseup=()=>{
          document.onmousemove=null;
          document.onmouseup=null;
        };
        return false;
      }
    }
  }
</script>

<style>
#box {
  width: 80px;
  height: 80px;
  background: #ccc;
  position: relative;
  transform: perspective(320px) rotateY(-60deg) rotateX(45deg);
  transform-style: preserve-3d;
  position: fixed;
  left: -160px;
  bottom: 40px;
}
#box div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  box-shadow: 0 0 40px #5fbcff;
  opacity: 0.8;
}
.front {
  transform: translateZ(40px);
  background: url("./images/a5.png");
}
.back {
  transform: translateZ(-40px);
  background: url("./images/a1.png");
}
.left {
  transform: translateX(-40px) rotateY(90deg);
  background: url("./images/a2.png");
}
.right {
  transform: translateX(40px) rotateY(90deg);
  background: url("./images/a3.png");
}
.top {
  transform: translateY(-40px) rotateX(90deg);
  background: url("./images/a4.png");
}
.bottom {
  transform: translateY(40px) rotateX(90deg);
  background: url("./images/a8.png");
}
</style>