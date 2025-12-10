import { ref } from "vue";
import { defineStore } from "pinia";
import { dialogStore } from "~/stores/dialog";
import { snackbar } from "mdui";
import addToFavoriteDialog from "~/components/AddToFavoriteDialog.vue";

export const useFavorites = defineStore(
  "favorites",
  () => {
    const inFavoriteName = ref("默认收藏夹");
    const favorites = ref({
      type: "map-favorite",
      list: [
        {
          name: "默认收藏夹",
          list: [],
        },
      ],
    });

    const find = (name) => {
      let index;
      for (let i = 0; i < favorites.value.list.length; i++) {
        if (favorites.value.list[i].name === name) {
          index = i;
          break;
        }
      }
      return index;
    };

    const isFavorited = (index, path) => {
      let state = false;

      for (let i = 0; i < favorites.value.list[index].list.length; i++) {
        if (favorites.value.list[index].list[i].path === path) {
          state = true;
          break;
        }
      }
      return state;
    };

    const add = (name) => {
      favorites.value.list.unshift({
        name,
        list: [],
      });
    };

    const promptAdd = () => {
      setTimeout(() => {
        const result = prompt("新建收藏夹");
        if (result) {
          add(result);
        }
      }, 0);
    };

    const addItem = (item, name) => {
      const index = find(name);

      if (isFavorited(index, item.path)) {
        if (confirm(`收藏夹中已经存在 “${item.name}”, 是否重复添加?`)) {
          favorites.value.list[index].list.unshift(item);
          snackbar({
            message: "✅添加成功",
            autoCloseDelay: 3000,
          });
        }
      } else {
        favorites.value.list[index].list.unshift(item);
        snackbar({
          message: "✅添加成功",
          autoCloseDelay: 3000,
        });
      }
    };

    const promptAddItem = (item) => {
      dialogStore.title = "选择一个收藏夹";
      dialogStore.open(addToFavoriteDialog, {
        data: favorites.value.list,
        item,
      });
    };

    const remove = (name) => {
      const index = find(name);
      favorites.value.list.splice(index, 1);
    };

    const confirmRemove = (name) => {
      setTimeout(() => {
        if (confirm(`是否删除 “${name}” ?`)) {
          remove(name);
        }
      }, 0);
    };

    const removeItem = (index) => {
      setTimeout(() => {
        const fIndex = find(inFavoriteName.value);
        if (
          confirm(
            `是否删除 “${favorites.value.list[fIndex].list[index].name}” ?`
          )
        ) {
          favorites.value.list[fIndex].list.splice(index, 1);
        }
      }, 0);
    };

    return {
      inFavoriteName,
      favorites,
      find,
      add,
      addItem,
      promptAdd,
      promptAddItem,
      remove,
      confirmRemove,
      removeItem,
    };
  },
  {
    persist: true,
  }
);
