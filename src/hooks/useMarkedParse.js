import { marked } from "marked";
import { $ } from "~/utils/utils";

export function useMarkedParse() {
  const setRenderer = () => {
    const renderer = {
      image({ href, text, title }) {
        let url = href;
        return `<a class="skeleton" data-fancybox="gallery" data-src="${url}" ${
          title ? 'title="' + title + '"' : ""
        }><img src="" alt="${text}" class="image hidden" /></a>`;
      },
    };

    marked.use({ renderer });
  };

  const markedParse = (options = {}) => {
    const { title, content } = options;
    setRenderer();
    const titleContent = `<h2 class="title">${title}</h2>`;
    const html = marked.parse(content);
    const elements = $(titleContent + html);
    for (const el of elements.querySelectorAll("audio, video")) {
      const src = el.getAttribute("src");
      el.setAttribute("data-src", src);
      el.setAttribute("controlsList", "nodownload");
      el.setAttribute(
        "src",
        el.nodeName === "VIDEO"
          ? "/resources/silent.mp4"
          : "/resources/silent.mp3"
      );
    }
    return elements;
  };

  return { markedParse };
}
