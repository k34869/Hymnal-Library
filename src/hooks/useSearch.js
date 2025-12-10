import { ref } from "vue";
import { Document } from "flexsearch";
import { getDatabase } from "~/utils/library";

let database;
const isInit = ref(false);
const index = new Document({
  document: {
    id: "id",
    index: ["name", "description"],
    store: ["name", "description", "category", "path", "type"],
  },
  tokenize: "full",
  encode: (str) =>
    str
      .trim()
      .toLowerCase()
      .split(/[\p{Z}\p{S}\p{P}\p{C}]+/u),
  resolution: 9,
});

function useSearch() {
  function addIndexs(indexs) {
    for (const item of indexs) {
      requestIdleCallback(() => {
        index.add(item);
      });
    }
  }

  async function updateDatabase() {
    isInit.value = false;
    return getDatabase().then(({ data }) => {
      database = data;
      localforage.setItem("search-db", data);
      isInit.value = true;
      addIndexs(data);
      return data;
    });
  }

  function applyDatabase(data) {
    database = data;
    isInit.value = true;
    addIndexs(data);
    return data;
  }

  async function initSearch() {
    if (isInit.value) {
      return Promise.resolve(database);
    } else {
      return localforage.getItem("search-db").then((data) => {
        if (data) {
          return applyDatabase(data);
        } else {
          return updateDatabase();
        }
      });
    }
  }

  const fristInitPromise = initSearch();

  function search(query, field = ["name", "description"], isHighlight = true) {
    const maps = {};
    const results = index.search(query, {
      limit: 24,
      enrich: true,
    });
    const reg = new RegExp(`(${query})`, "gi");
    for (const item of results) {
      if (field.includes(item.field)) {
        for (const e of item.result) {
          if (!maps[e.id]) {
            maps[e.id] = Object.assign({}, e.doc);
          }
          maps[e.id].id = e.id;
          maps[e.id].name = isHighlight
            ? e.doc.name.replace(reg, `<span class="mark">$1</span>`)
            : e.doc.name;
          maps[e.id].description = isHighlight
            ? e.doc.description.replace(reg, `<span class="mark">$1</span>`)
            : e.doc.description;
        }
      }
    }
    return Object.values(maps);
  }

  return {
    updateDatabase,
    search,
    initSearch,
    isInit,
    fristInitPromise,
  };
}

export { database, useSearch };
