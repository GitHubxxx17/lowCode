import "@/sass/editor/Menu.scss";
import { defineComponent } from "vue";
import mainStore from "../../stores/mainStore";
import pinia from "../../stores";

export default defineComponent({
  props: {
    selectComponent: Function,
    unselectComponent: Function,
    makeACopy: Function,
    copycomponents: Function,
    shearComponents: Function,
    delComponents: Function,
    pasteComponents: Function,
    moveForward: Function,
    moveBack: Function,
    undo: Function,
    redo: Function,
    commands: Object,
  },
  setup(props) {
    const mainData = mainStore(pinia);
    return () => {
      return (
        <div
          class="menu"
          v-show={mainData.menuConfig.isShowMenu}
          style={mainData.menuConfig.style}
        >
          <el-menu
            class="el-menu-vertical-demo"
            active-text-color="#151b26"
            text-color="#151b26"
          >
            <el-menu-item
              index="1"
              disabled={mainData.menuConfig.isShow.selectComponent}
            >
              <div onClick={(e) => props.selectComponent(e)}>选中组件</div>
            </el-menu-item>
            <el-menu-item
              index="2"
              disabled={mainData.menuConfig.isShow.unselectComponent}
            >
              <div onClick={(e) => props.unselectComponent(e)}>取消选中</div>
            </el-menu-item>
            <i></i>
            <el-menu-item
              index="3"
              disabled={mainData.menuConfig.isShow.makeACopy}
            >
              <div onClick={(e) => props.makeACopy(e, props.commands)}>
                重复一份
              </div>
            </el-menu-item>
            <el-menu-item
              index="4"
              disabled={mainData.menuConfig.isShow.copycomponents}
            >
              <div onClick={(e) => props.copycomponents(e)}>复制组件</div>
            </el-menu-item>
            <el-menu-item
              index="5"
              disabled={mainData.menuConfig.isShow.shearComponents}
            >
              <div onClick={(e) => props.shearComponents(e, props.commands)}>
                剪切组件
              </div>
            </el-menu-item>
            <el-menu-item
              index="6"
              disabled={mainData.menuConfig.isShow.pasteComponents}
            >
              <div onClick={(e) => props.pasteComponents(e)}>粘贴组件</div>
            </el-menu-item>
            <el-menu-item
              index="7"
              disabled={mainData.menuConfig.isShow.delComponents}
            >
              <div onClick={(e) => props.delComponents(e, props.commands)}>
                删除
              </div>
            </el-menu-item>
            <i></i>
            <el-menu-item
              index="8"
              disabled={mainData.menuConfig.isShow.moveForward}
            >
              <div onClick={(e) => props.moveForward(e)}>向前移动</div>
            </el-menu-item>
            <el-menu-item
              index="9"
              disabled={mainData.menuConfig.isShow.moveBack}
            >
              <div onClick={(e) => props.moveBack(e)}>向后移动</div>
            </el-menu-item>
            <i></i>
            <el-menu-item index="10" disabled={mainData.menuConfig.isShow.undo}>
              <div onClick={(e) => props.undo(e, props.commands)}>
                撤销 (UnDo)
              </div>
            </el-menu-item>
            <el-menu-item index="11" disabled={mainData.menuConfig.isShow.redo}>
              <div onClick={(e) => props.redo(e, props.commands)}>
                还原 (ReDo)
              </div>
            </el-menu-item>
          </el-menu>
        </div>
      );
    };
  },
});
