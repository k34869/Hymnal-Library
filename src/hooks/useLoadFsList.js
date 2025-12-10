import { ref, watch, computed, onActivated } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { getFsList } from "~/utils/library";
import { stackHistory } from "~/stores/stackLibrary";
import { useFristFsList } from "~/stores/fristFsList";
import { useViewPortIn } from "./useViewPortIn";
import { getPageItemLength, getPageNumber } from "~/utils/library";

export function useLoadFsList() {
  const route = useRoute();
  const { viewPortIn } = useViewPortIn();
  const pathArray = ref([]);
  const { fristFsList } = storeToRefs(useFristFsList());
  const fsList = ref({ list: [] });
  const pageNo = ref(1);
  let pageItemLength = getPageItemLength(62);
  const paginationFslist = computed(() => ({
    type: fsList.value.type,
    list: fsList.value.list.slice(0, pageItemLength * pageNo.value),
  }));
  const isLoading = ref(false);
  const isShowBottomLoading = ref(false);
  let isFristLoad = true;

  const loadFsList = () => {
    isLoading.value = false;
    if (isFristLoad && fristFsList.value) {
      isFristLoad = false;
      fsList.value = fristFsList.value;
      isLoading.value = true;
      if (
        pageNo.value < getPageNumber(fsList.value.list.length, pageItemLength)
      )
        isShowBottomLoading.value = true;
      return Promise.resolve(fristFsList.value);
    } else {
      const promise = getFsList(pathArray.value.join("/"));
      promise.then((data) => {
        if (!isLoading.value) {
          isFristLoad = false;
          fsList.value = data;
          isLoading.value = true;
          if (
            pageNo.value <
            getPageNumber(fsList.value.list.length, pageItemLength)
          )
            isShowBottomLoading.value = true;
        }
      });
      return promise;
    }
  };

  const promise = loadFsList();
  promise.then((data) => {
    fristFsList.value = data;
  });

  let stop;
  onActivated(() => {
    const $pageNavigation = document.querySelector(".path-navigation");
    stop = watch(
      () => route.params.pathMatch,
      (value) => {
        pathArray.value = value ? value : [];
        pageNo.value = 1;
        setTimeout(() => {
          $pageNavigation.scrollTo({ left: $pageNavigation.scrollWidth });
        }, 0);
        if (stackHistory[0].path === pathArray.value.join("/")) {
          fsList.value = stackHistory[0].list;
          isLoading.value = true;
          setTimeout(() => {
            document
              .getElementById("main")
              .scrollTo({ top: stackHistory[0].scrollTop });
            stackHistory.shift();
          }, 0);
        } else {
          loadFsList();
        }
      }
    );
    viewPortIn(
      [document.querySelector(".fs-list-bottom-loading")],
      () => {
        pageItemLength = getPageItemLength(62);
        pageNo.value++;
        if (
          pageNo.value >=
          getPageNumber(fsList.value.list.length, pageItemLength)
        ) {
          isShowBottomLoading.value = false;
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );
  });

  onBeforeRouteLeave(() => {
    stop();
  });

  return {
    fsList,
    paginationFslist,
    isLoading,
    isShowBottomLoading,
    pathArray,
    loadFsList,
  };
}
