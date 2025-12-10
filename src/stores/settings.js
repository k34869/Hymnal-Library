import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { SafeArea } from "@capacitor-community/safe-area";

export const useSettings = defineStore(
  "settings",
  () => {
    const isDark = ref(false);
    const isDarkWithSystem = ref(true);
    const isScreenAlways = ref(true);
    const setupPageName = ref("资料库");
    const mduiThemeName = computed(() => {
      if (isDarkWithSystem.value) {
        return "mdui-theme-auto";
      } else {
        if (isDark.value) {
          return "mdui-theme-dark";
        } else {
          return "mdui-theme-light";
        }
      }
    });

    async function setSafeArea(theme) {
      await SafeArea.enable({
        config: {
          customColorsForSystemBars: true,
          statusBarColor: "#00000000",
          statusBarContent: theme === "dark" ? "light" : "dark",
          navigationBarColor: "#00000000",
        },
      });
    }

    function initSafeArea() {
      const inTheme = mduiThemeName.value.replace("mdui-theme-", "");

      if (inTheme === "auto") {
        setSafeArea(
          window.matchMedia("(prefers-color-scheme: dark)").matches === "dark"
            ? "light"
            : "dark"
        );
      } else {
        setSafeArea(inTheme);
      }
    }

    const setTheme = () => {
      document.documentElement.setAttribute("class", mduiThemeName.value);
      initSafeArea();
    };

    const setScreenAlways = () => {
      if (isScreenAlways.value) {
        KeepAwake.keepAwake();
      } else {
        KeepAwake.allowSleep();
      }
    };

    const initSettings = () => {
      setTheme();
      setScreenAlways();
      initSafeArea();
    };

    return {
      isDark,
      isDarkWithSystem,
      isScreenAlways,
      setupPageName,
      setTheme,
      setScreenAlways,
      initSettings,
    };
  },
  {
    persist: true,
  }
);
