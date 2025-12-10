import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { getMarkdown, getFile } from "~/utils/library-web";
import { useMarkedParse } from "~/hooks/useMarkedParse";
import { useViewPortIn } from "./useViewPortIn";

export function useRenderMarkdown(selector) {
  const route = useRoute();
  const { viewPortIn } = useViewPortIn();
  const { markedParse } = useMarkedParse();
  const elements = ref();
  const isLoading = ref(false);
  const pathString = ref("");
  const directory = ref("");
  const title = ref("");

  onMounted(() => {
    isLoading.value = false;
    pathString.value = (
      route.params.pathMatch ? route.params.pathMatch : []
    ).join("/");
    getMarkdown(pathString.value).then((content) => {
      const pathArray = pathString.value.split("/");
      title.value = pathArray[pathArray.length - 1];
      directory.value = pathString.value.replace(title.value, "");
      document.title = title.value + " - 诗歌库";
      const html = markedParse({
        title: title.value,
        content,
      });
      elements.value = html;
      isLoading.value = true;
      viewPortIn(html.querySelectorAll("img, video"), (entry, observer) => {
        const el = entry.target;
        const elp = el.nodeName === "VIDEO" ? el : el.parentNode;
        const src = elp.getAttribute("data-src");
        if (!/(http:\/\/|https:\/\/|:\/\/)/.test(src)) {
          const promise = getFile(`/hymnal-library/${pathString.value}/${src}`);
          if (el.nodeName === "VIDEO") {
            promise.then(({ data }) => {
              el.setAttribute("src", data.data.raw_url);
            });
          } else {
            promise.then(({ data }) => {
              elp.setAttribute("data-src", data.data.raw_url);
              elp.classList.remove("skeleton");
              el.setAttribute("src", data.data.raw_url);
              el.classList.remove("hidden");
            });
          }
        }
        observer.unobserve(entry.target);
      });
      for (const el of html.querySelectorAll("audio")) {
        const src = el.getAttribute("data-src");
        const lazyMedia = () => {
          el.removeEventListener("play", lazyMedia);
          el.setAttribute("src", "");
          el.setAttribute("src", "/resources/silent.mp3");
          if (!/(http:\/\/|https:\/\/|:\/\/)/.test(src)) {
            getFile(`/hymnal-library/${pathString.value}/${src}`).then(
              ({ data }) => {
                el.setAttribute("src", data.data.raw_url);
                el.play();
              }
            );
          }
        };
        el.addEventListener("play", lazyMedia);
      }
      document.querySelector(selector).appendChild(html);
      Fancybox.bind('[data-fancybox="gallery"]', {
        placeFocusBack: false,
        Carousel: {
          Thumbs: true,
          Toolbar: {
            display: {
              left: [],
              middle: [],
              right: [],
            },
          },
          Zoomable: {
            Panzoom: {
              mouseMoveFactor: 1.1,
            },
          },
        },
      });
    });
  });

  onBeforeUnmount(() => {
    if (isLoading.value) {
      for (const el of elements.value.querySelectorAll("video, audio")) {
        el.pause();
        el.src = "";
        el.load();
        el.remove();
      }
      elements.value.remove();
      elements.value = null;
      Fancybox.unbind('[data-fancybox="gallery"]');
      directory.value = "";
      title.value = "";
    }
  });

  return {
    elements,
    isLoading,
    pathString,
    directory,
    title,
  };
}
