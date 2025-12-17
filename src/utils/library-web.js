import { snackbar } from "mdui/functions/snackbar.js";

export async function getFile(path) {
  const promise = fetch(`https://na8pp3fe.cn-nb1.rainapp.top/api/fs/get`, {
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      path,
      password: "",
    }),
  });

  promise.catch((err) => {
    snackbar({
      message: `❌${err.message}`,
      autoCloseDelay: 3000,
    });
  });
  return promise.then((res) => res.json());
}

async function requestResource(path, type) {
  return getFile(path)
    .then((data) => {
      return fetch(data.data.raw_url);
    })
    .then((data) => data.text());
}

export async function getMarkdown(path) {
  return requestResource(`/hymnal-library/${path ? path + "/" : ""}index.md`);
}
