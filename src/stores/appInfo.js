import { ref } from "vue";

export const appInfo = ref({});

export async function chackUpdate() {
  return fetch(
    `https://api.github.com/repos/k34869/Hymnal-Library/releases/latest`
  ).then(async (response) => {
    if (response.ok) {
      return response.json().then((data) => {
        const {
          tag_name,
          assets: [{ browser_download_url }],
        } = data;
        return { version: tag_name, browser_download_url };
      });
    }
  });
}

export function compareVersion(v1, v2) {
  const a1 = v1.split(".").map(Number);
  const a2 = v2.split(".").map(Number);

  const len = Math.max(a1.length, a2.length);

  for (let i = 0; i < len; i++) {
    const n1 = a1[i] ?? 0;
    const n2 = a2[i] ?? 0;

    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }

  return 0;
}
