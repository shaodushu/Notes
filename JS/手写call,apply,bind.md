### 手写call

```javascript
Function.prototype.call1 = function () {
  // 初始化，获取传入的this对象和后续所有参数
  const [context, ...args] = [...arguments];
  // 在传入的对象上设置属性为待执行函数
  // 当前this的指向是调用方的this(Product)
  // Example: Product.call(this,...arg)
  context.fn = this;
  // 执行函数
  const res = context.fn(args);
  // 删除属性
  delete context.fn;

  // 返回执行结果
  return res;
};

Product.call1(obj);

obj.fn = Product;

obj = {
  a: 1,
  fn: Product,
};

obj.fn;
```

### 手写apply

```javascript
Function.prototype.apply1 = function () {
  // 初始化，获取传入的this对象和后续所有参数
  const [context, args] = [...arguments];
  // 在传入的对象上设置属性为待执行函数
  // 当前this的指向是调用方的this(Product)
  // Example: Product.apply(this,arg)
  context.fn = this;
  // 执行函数
  // 判断第二个参数是否存在，不存在直接执行，否则拼接参数执行，并存储函数执行结果
  const res = !args ? context.fn() : context.fn(...args);
  // 删除属性
  delete context.fn;

  // 返回执行结果
  return res;
};

Product.apply1(obj);

obj.fn = Product;

obj = {
  a: 1,
  fn: Product,
};

obj.fn;
```

### 手写bind

#### 第一版完成this指向

```javascript
Function.prototype.bind1 = function (context) {
  // 将当前函数的this存放起来
  const _self = this;

  return function () {
    // 改变this
    return _self.apply(context);
  };
};
```

#### 第二版完成

```javascript
Function.prototype.myBind_1 = function() {
    let outContext = arguments[0] // 取上下文
    let outArgs = Array.from(arguments).slice(1) // 取外部入参
    const outThis = this // 存外部this
    let cb = function() {
        const inArgs = Array.from(arguments)// 取内部入参
        return outThis.apply(outContext, outArgs.concat(inArgs)) // 改变指向，合并函数入参
    }
    return cb // 返回创建函数
}
```

