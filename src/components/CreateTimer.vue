<template>
  <div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Краткое описание таймера"
        v-model="description"
      />
      <input
        type="number"
        min="1"
        class="form-control flex-grow-0-2"
        :class="{ 'is-invalid': errorSetTimer, 'is-valid': !errorSetTimer }"
        placeholder="Время таймера"
        v-model.number="duration"
        required
      />
      <button class="btn btn-primary" @click="startTimer(duration)">
        Запустить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addTimer, getListTimer } from "../services/request";
import eventBus from "../services/eventBus";

const description = ref("");
const duration = ref(process.env.VUE_APP_TIMER_DEFAULT);

let errorSetTimer = ref(false);
let currentTime = ref(Math.floor(new Date().getTime()));

const setCurrentTime = function (time) {
  currentTime.value = time;
};
eventBus.$on("currentTime", setCurrentTime);
const startTimer = async function () {
  if (!duration.value) {
    errorSetTimer.value = true;
  } else {
    errorSetTimer.value = false;
    const data = {
      description: description.value,
      createdAt: currentTime.value,
      finishAt: currentTime.value + duration.value * 60000,
      duration: duration.value * 60,
      howLong: "",
      status: "play",
    };
    await addTimer(data);
    eventBus.$emit("timers", await getListTimer());
  }
};
</script>

<style scope>
.flex-grow-0-2 {
  flex: 0.2 1 auto !important;
}
</style>
