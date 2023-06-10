github提交规范：
增加新功能用 feat: xxxx
改 bug 用 fix: xxxxx
重构代码用 refactor: xxx
加单测用 test: xxxx
改基建用 chore: xxx
堉琦记录：
1. ts中map不能使用下标的方式添加内容，需要使用set()
2. 在tsx引入tsx组件时，第一个字母要大写
3. 渲染函数有问题，每次渲染到的对象是内容是相同的时候就会直接复制那个对象的dom节点，得把对象深拷贝才能解决
4. pointer-events: none;禁止当前dom节点的事件触发，可以使下面一层的dom节点的事件触发
思敏记录：
1. 结点函数知识点：
+  parentNode.insertBefore(newNode, referenceNode);
（1）newNode：将要插入的节点
（2）referenceNode：被参照的节点（即要插在该节点之前）
