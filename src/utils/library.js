import { CapacitorHttp } from "@capacitor/core";
import { snackbar } from "mdui/functions/snackbar.js";

export async function getFile(path) {
  const promise = CapacitorHttp.post({
    url: `http://110.42.111.49:23886/api/fs/get`,
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
    },
    data: {
      path,
      password: "",
    },
  });
  promise.catch((err) => {
    snackbar({
      message: `❌${err.message}`,
      autoCloseDelay: 3000,
    });
  });
  return promise;
}

async function requestResource(path, type) {
  return getFile(path)
    .then(({ data }) => {
      return CapacitorHttp.get({
        url: data.data.raw_url,
      });
    })
    .then(({ data }) => {
      if (type === "json") {
        return JSON.parse(data);
      } else {
        return data;
      }
    });
}

export async function getFsList(path) {
  return requestResource(
    `/hymnal-library/${path ? path + "/" : ""}map.json`,
    "json"
  );
}

export async function getMarkdown(path) {
  return requestResource(`/hymnal-library/${path ? path + "/" : ""}index.md`);
}

export async function getDatabase() {
  return requestResource(`/hymnal-library/db.json`, "json");
}

export function filterMark(string) {
  return string.replace(/<span class="mark">|<\/span>/g, "");
}

export function getPageItemLength(itemHeight) {
  return parseInt(
    document.getElementById("main").getBoundingClientRect().height /
      itemHeight +
      5
  );
}

export function getPageNumber(listLength, pageItemLength) {
  const num = listLength / pageItemLength;
  return Number.isInteger(num) ? num : parseInt(num) + 1;
}
