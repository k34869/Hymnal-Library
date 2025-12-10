import { ref } from "vue";
import { defineStore } from "pinia";

export const useFristFsList = defineStore(
  "fristFsList",
  () => {
    const fristFsList = ref(null);

    return {
      fristFsList,
    };
  },
  {
    persist: true,
  }
);
