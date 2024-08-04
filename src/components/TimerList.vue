<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item" v-for="(value, key) in timerList" :key="key">
      <h2 class="accordion-header" :id="'heading' + key">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + key"
          aria-expanded="true"
          :aria-controls="'collapse' + key"
        >
          {{ value.date }}
        </button>
      </h2>
      <div
        :id="'collapse' + key"
        class="accordion-collapse collapse show"
        :aria-labelledby="'headingOne' + key"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <ul class="list-group">
            <li class="list-group-item list-header">
              <b>#</b>
              <b>Описание</b>
              <b>Время запуска</b>
              <b>Время завершения</b>
              <b>Длит.</b>
              <b></b>
            </li>
            <li
              class="list-group-item"
              v-for="item in value.timers"
              :key="item.id"
              aria-current="true"
            >
              <TimerItem :item="item"></TimerItem>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import TimerItem from "./TimerItem.vue";
import { getListTimer } from "../services/request";
import eventBus from "../services/eventBus";
import { formatDate } from "../utils/dateUtils";

const timerList = ref([]);

const handleDataUpdate = (newData) => {
  timerList.value = [];
  const map = reactive(new Map());
  for (let key in newData) {
    map.set(formatDate(newData[key].createdAt), []);
  }
  for (let key in newData) {
    map.get(formatDate(newData[key].createdAt)).push(newData[key]);
  }
  map.forEach((value, key) => {
    timerList.value.push({
      date: key,
      timers: value,
    });
  });
};

onMounted(async () => {
  handleDataUpdate(await getListTimer());
  eventBus.$on("timers", handleDataUpdate);
});
</script>

<style scope>
.list-group-item {
  padding: 0 !important;
}
.list-header {
  display: grid !important;
  grid-template-columns: 20px 260px 150px 150px 60px auto;
  padding: 10px !important;
  align-items: center;
}
</style>
