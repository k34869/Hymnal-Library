import { useRoute, useRouter } from "vue-router";

let pageNum = 0;

export function useNavigationTo() {
  const route = useRoute();
  const router = useRouter();

  const navigationTo = (options = {}) => {
    const { name, path } = options;

    if (route.name === "资料库") {
      if (name === "资料库") {
        return;
      }
      pageNum++;
      router.push(path);
    } else {
      if (name === "资料库") {
        router.back(-pageNum);
        pageNum = 0;
      } else {
        router.replace(path);
      }
    }
  };

  return {
    navigationTo,
  };
}
