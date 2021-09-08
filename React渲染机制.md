# React渲染机制



### React.createElement()

```react
React.createElement(
  type,
  [props],
  [...children]
)
```

创建并返回指定类型的新 [React 元素](https://zh-hans.reactjs.org/docs/rendering-elements.html)。其中的类型参数既可以是标签名字符串（如 `'div'` 或 `'span'`），也可以是 [React 组件](https://zh-hans.reactjs.org/docs/components-and-props.html) 类型 （class 组件或函数组件），或是 [React fragment](https://zh-hans.reactjs.org/docs/react-api.html?#reactfragment) 类型。

> React元素，即为React虚拟DOM节点

#### Babel(@babel/preset-react)

##### Babel转换前

```react
function Header(props){
return <div onClick={props.onClick}>{props.children}</div>
}

function hello() {
  return <Header onClick={()=>console.log(1)}>Hello world!</Header>;
}
```

##### Babel转换后

```javascript
function Header(props) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: props.onClick
  }, props.children);
}

function hello() {
  return /*#__PURE__*/React.createElement(Header, {
    onClick: () => console.log(1)
  }, "Hello world!");
}
```

##### creteElement返回React元素



![image-20210908231454865](C:\Users\shaodushu\AppData\Roaming\Typora\typora-user-images\image-20210908231454865.png)



> 返回值为JS对象



### ReactDOM.render()

```react
ReactDOM.render(element, container[, callback])
```

在提供的 `container` 里渲染一个 React 元素，并返回对该组件的[引用](https://zh-hans.reactjs.org/docs/more-about-refs.html)（或者针对[无状态组件](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)返回 `null`）。

> render中通过React Fiber算法以及fiber tree数据结构（基于单链表的树结构），创建一棵虚拟DOM树

- 虚拟DOM树如何映射到真实DOM?



参考资料：

```markdown
[react渲染原理分析](https://www.jianshu.com/p/8dc8e59844c9)
```

