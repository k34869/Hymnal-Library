import { CapacitorHttp } from "@capacitor/core";
import { snackbar } from "mdui/functions/snackbar.js";

export async function getFile(path) {
  const promise = CapacitorHttp.post({
    url: `/api/fs/get`,
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

export async function getMarkdown(path) {
  return requestResource(`/hymnal-library/${path ? path + "/" : ""}index.md`);
}
