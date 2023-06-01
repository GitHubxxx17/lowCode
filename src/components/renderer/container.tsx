import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref } from "vue";
import Sortable from "sortablejs";

export default defineComponent({
  props: {
    style: Object,//样式
    children: Object,//子节点
    childrenList: Array<Object>,//子节点json数据
    text: String,//无组件时显示的文本内容
    class: String//类名
  },
  setup(props) {
    let containerRef = ref(null);

    onMounted(() => {
      // Sortable.prototype._appendGhost = null;
      // console.log(Sortable.prototype);
      new Sortable(containerRef.value, {
        group: {
          name: 'container',
          put: ['listItem', 'container']
        },
        animation: 150,
        chosenClass: 'sortable-chosen',
        onAdd: function (evt) {
          console.log(evt);
          console.log(Sortable.prototype);
        },
        
      });
    })
    return () => {
      return (
        <div class={props.class}
          style={props.style}
          ref={containerRef}
        >
          {props.children.length != 0 ? props.children : <span class="nochild">{props.text}</span>}
        </div>
      );
    };
  },
});
