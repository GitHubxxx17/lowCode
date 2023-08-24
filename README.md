### github 提交规范：

1. 增加新功能用 feat: xxxx
2. 改 bug 用 fix: xxxxx
3. 重构代码用 refactor: xxx
4. 加单测用 test: xxxx
5. 改基建用 chore: xxx

### 堉琦记录：

1. ts 中 map 不能使用下标的方式添加内容，需要使用 set()
2. 在 tsx 引入 tsx 组件时，第一个字母要大写
3. 渲染函数有问题，每次渲染到的对象是内容是相同的时候就会直接复制那个对象的 dom 节点，得把对象深拷贝才能解决
4. pointer-events: none;禁止当前 dom 节点的事件触发，可以使下面一层的 dom 节点的事件触发
5. 可以利用以下代码为 ts 中的对象动态添加新的属性

```ts
interface nodeProps {
  [key: string]: any; //动态添加新属性
}
```
6. 利用transition-group绑定key和vue渲染机制实现拖拽动画，只需要修改渲染数据的顺序即可刷新dom节点实现拖拽动画移动

### 思敏记录：

1. 结点函数知识点：

- parentNode.insertBefore(newNode, referenceNode);
  （1）newNode：将要插入的节点
  （2）referenceNode：被参照的节点（即要插在该节点之前）

2. vue 刷新组件原理：vue 使用 key 标记组件身份，当 key 改变时就是释放原始组件，重新加载新的组件。（刷新组件最好的方法）

3. 按照 tsx 的写法，使用图片时需要通过 import 或 require 语句引入图片文件，并将其赋值给一个变量，然后将该变量作为图片的 src 属性值。——下拉框头像显示不了解决方法

4. 右边侧边栏底部部分没有显示完全解决方法：

- 父元素高度不够：滚动条是依据父元素的高度来计算的。如果父元素的高度不够，滚动条将无法完全显示。确保父元素包裹了所有内容并给予足够的高度。

- 内容超出父元素高度：如果父元素的内容超出了它的高度，即使设置了滚动条，也无法显示全部内容。在这种情况下，你可以考虑调整元素的高度或通过其他方式来适应内容。

### 未解决的 bug（待处理）：

1. 右侧修改配置，但容器没有实时改变（多行文本框行数，输入框 type）(已解决)
2. 拖拽(已解决)
3. 点击选中不能取消(已解决)
4. 超出编辑区域 x 轴没有滚动条
5. 右边侧边栏底部部分没有显示完全(已解决)
6. input 外观圆角不能双向绑定
7. 预览没有双向绑定(已解决)
8. 撤销和还原只能执行一次(已解决)
9. 选择图标修改尺寸只输入字母的时候有 bug(已解决)
10. 刷新页面后 pinia 数据没有及时响应（这个 bug 好像没了）
11. 下拉框头像显示不了(已解决)
12. flex 布局没有修改后重新选择没有修改 input 框里面的值(已解决)
13. 修改用户名不能用字母
14. 首次打开页面登录会自动刷新一遍才能登录(已解决)
15. 超出编辑区域拖拽命令需要不能生效（已解决）
16. 大纲页面取消选中不能执行
17. 菜单显示不全需要调整显示位置
18. 寻找父节点的时候根节点没有被搜索到
19. 右击菜单前进后退的优化

任务：

1. 大纲点击锁定+导航栏文字显示(已完成)
2. 图标渲染(已完成)
3. 搜索组件(已完成)
4. 绑定事件(已完成)
5. 已保存(已完成)
6. 添加新的组件、图标和事件
7. 性能优化
8. 前端监控
9. 渲染器
10. 右击菜单栏(已完成)
