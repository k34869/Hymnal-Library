import { onActivated, onDeactivated } from "vue";

export function useSaveScrollPosition() {
  let savedPosition = 0;

  onDeactivated(() => {
    savedPosition = document.getElementById("main").scrollTop;
  });

  onActivated(() => {
    document.getElementById("main").scrollTo({ top: savedPosition });
  });
}
