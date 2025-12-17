import { CapacitorHttp } from "@capacitor/core";
import { snackbar } from "mdui/functions/snackbar.js";

export async function getFile(path) {
  const promise = CapacitorHttp.post({
    url: `http://114.66.61.131:6042/api/fs/get`,
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

export async function getFsList(path) {
  return fetch(`/library/${path ? path + "/" : ""}map.json`).then((res) =>
    res.json()
  );
}

export async function getMarkdown(path) {
  return fetch(`/library/${path ? path + "/" : ""}index.md`).then((res) =>
    res.text()
  );
}

export async function getDatabase() {
  return fetch(`/library/db.json`).then((res) => res.json());
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
