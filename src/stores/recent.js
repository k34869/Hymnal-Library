import { ref } from "vue";
import { defineStore } from "pinia";

export const useRecent = defineStore(
  "recent",
  () => {
    const list = ref([]);
    const recentLength = 35;
    const find = (path) => {
      let index;
      for (let i = 0; i < list.value.length; i++) {
        if (list.value[i].path === path) {
          index = i;
          break;
        }
      }
      return index;
    };

    const remove = (path) => {
      const index = find(path);
      if (typeof index === "number") {
        list.value.splice(index, 1);
      }
    };

    const add = (item) => {
      if (item) {
        remove(item.path);
        if (list.value.length >= recentLength) {
          list.value.pop();
        }
        list.value.unshift(item);
      }
    };

    const clear = () => {
      list.value = [];
    };

    return {
      list,
      add,
      clear,
    };
  },
  { persist: true }
);
