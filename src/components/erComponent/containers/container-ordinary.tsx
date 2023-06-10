import { defineComponent } from "vue";

export const appearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    return () => {
      return <div></div>;
    };
  },
});

export const Property = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    return () => {
      return <div></div>;
    };
  },
});
