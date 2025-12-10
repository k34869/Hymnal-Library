import { shallowRef, reactive } from "vue";

export const dialogStore = reactive({
  isOpen: false,
  title: "",
  description: "",
  component: null,
  props: null,
  showButtons: false,
  onSubmit: () => {},
  open(component, props = {}) {
    this.component = shallowRef(component);
    this.props = props;
    this.isOpen = true;
  },
  close() {
    this.isOpen = false;
    setTimeout(() => {
      this.props = null;
      this.title = "";
      this.description = "";
      this.showButtons = false;
      this.onSubmit = () => {};
      this.component = null;
    }, 200);
  },
});
