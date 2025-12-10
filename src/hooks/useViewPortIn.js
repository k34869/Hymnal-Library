import { onBeforeUnmount } from "vue";
import { onBeforeRouteLeave } from "vue-router";

export function useViewPortIn() {
  let observer;
  let els;

  function viewPortIn(
    elements,
    callback,
    options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  ) {
    els = elements;
    observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry, observer);
        }
      });
    }, options);

    for (const el of elements) {
      observer.observe(el);
    }
    return observer;
  }

  onBeforeRouteLeave(() => {
    for (const el of els) {
      observer.unobserve(el);
    }
  });

  return {
    viewPortIn,
  };
}
