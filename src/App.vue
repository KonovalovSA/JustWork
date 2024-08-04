<template>
  <div class="appTimer">
    <CreateTimer></CreateTimer>
    <TimerList></TimerList>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import CreateTimer from "./components/CreateTimer.vue";
import TimerList from "./components/TimerList.vue";
import eventBus from "../src/services/eventBus";

const updateCurrentTime = () => {
  eventBus.$emit("currentTime", Math.floor(new Date().getTime()));
};
let intervalTime;
onMounted(() => {
  intervalTime = setInterval(updateCurrentTime, 1000);
});
onUnmounted(() => {
  clearInterval(intervalTime);
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.appTimer {
  width: 850px;
  margin: 0 auto;
}

p {
  margin: 0 !important;
}
</style>
