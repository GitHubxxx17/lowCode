import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import Sortable from "sortablejs";
import { usesortable } from '../../hooks/useSortable.js';

export default defineComponent({
  props: {
    style: Object,//样式
    children: Object,//子节点
    childrenList: Array<Object>,//子节点json数据
    text: String,//无组件时显示的文本内容
    class: String,//类名
  },
  setup(props) {

    let containerRef = ref(null);
    
    onMounted(() => {
      
      // Sortable.prototype._appendGhost = null;
      // console.log(Sortable.prototype);
      let sort = new Sortable(containerRef.value, usesortable.setContainerOptions(containerRef,props.childrenList));
      console.log(sort);
      
    })
    return () => {
      return (
        <div class={props.class}
          style={props.style}
          ref={containerRef}
          datatype={props.class}
        >
          {props.children.length != 0 ? props.children : <span class="nochild">{props.text}</span>}
        </div>
      );
    };
  },
});
