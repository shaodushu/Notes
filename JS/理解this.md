# 理解this

**当函数独立调用的时候，在严格模式下它的this指向undefined，在非严格模式下，当this指向undefined的时候，自动指向全局对象(浏览器中就是window)**



**当obj在全局声明的时候，obj内部属性中的this指向全局对象，当obj在一个函数中声明的时候，严格模式下this会指向undefined，非严格模式自动转为指向全局对象**



函数的调用方式都有哪些呢？四种：

1. 在全局环境或是普通函数中直接调用
2. 作为对象的方法
3. 使用apply和call
4. 作为构造函数

[^资料来源]: 来自 <https://juejin.im/post/59748cbb6fb9a06bb21ae36d>

### 理解常规函数中this

**1. 纯粹的函数调用**

**2. 对象中函数的调用**

**3. 构造函数中this**

**4. window.setTimeout()和window.setInterval()中函数的调用**



> **window.setTimeout()**和**window.setInterval()**的函数中的this有些特殊，里面的this默认是**window**对象。

[^资料来源]: 来自<https://juejin.im/post/5aa1eb056fb9a028b77a66fd>

