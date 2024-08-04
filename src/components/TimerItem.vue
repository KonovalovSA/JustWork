<template>
  <div class="timer">
    <div class="timer-info">
      <b>{{ props.item.id }}</b>
      <p>{{ props.item.description }}</p>
      <p>{{ formatDateTime(new Date(props.item.createdAt)) }}</p>
      <p>{{ formatDateTime(new Date(props.item.finishAt)) }}</p>
      <p>{{ props.item.duration / 60 }}</p>
    </div>
    <div
      v-if="currentTime < props.item.finishAt || props.item.howLong"
      class="timer-controls"
    >
      <button
        class="btn btn-danger timer-stop"
        @click="stopTimer(props.item.id)"
      >
        <font-awesome-icon icon="stop" />
      </button>
      <button
        class="btn btn-warning timer-pause"
        :disabled="props.item.status === 'pause'"
        @click="pauseTimer(props.item.id)"
      >
        <font-awesome-icon icon="pause" />
      </button>
      <button
        class="btn btn-success timer-play"
        :disabled="props.item.status === 'play'"
        @click="startTimer(props.item.id)"
      >
        <font-awesome-icon icon="play" />
      </button>
    </div>
    <div v-else class="text-bg-danger p-3 timer-done">Завершено</div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { formatDateTime } from "../utils/dateUtils";
import { setTimer, getListTimer } from "../services/request";
import eventBus from "../services/eventBus";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

let currentTime = ref(Math.floor(new Date().getTime()));

const setCurrentTime = function (time) {
  currentTime.value = time;
};
eventBus.$on("currentTime", setCurrentTime);

const startTimer = async function (id) {
  await setTimer(id, {
    finishAt: props.item.finishAt + (currentTime.value - props.item.howLong),
    status: "play",
    howLong: "",
  });
  eventBus.$emit("timers", await getListTimer());
};

const pauseTimer = async function (id) {
  console.log("когда остановили", currentTime.value);
  await setTimer(id, {
    howLong: currentTime.value,
    status: "pause",
  });
  eventBus.$emit("timers", await getListTimer());
};

const stopTimer = async function (id) {
  await setTimer(id, {
    finishAt: currentTime.value,
    status: "stop",
    howLong: "",
  });
  eventBus.$emit("timers", await getListTimer());
};
</script>

<style scope>
.timer {
  display: flex;
}
.timer-info {
  display: grid;
  grid-template-columns: 20px 260px 150px 150px 60px auto;
  padding: 10px;
  align-items: center;
}
.timer-controls {
  width: 100%;
  position: relative;
}
.timer-controls button {
  float: right;
  width: 33.3%;
  height: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.timer-stop {
  border-radius: 0 5px 5px 0 !important;
}
.timer-play,
.timer-pause {
  border-radius: 0 !important;
}
.timer-done {
  border-radius: 0 5px 5px 0;
  width: 100%;
}
</style>
