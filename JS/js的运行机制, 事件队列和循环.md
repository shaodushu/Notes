### JS运行机制

### JS事件队列

### JS事件循环机制（event loop）之宏任务微任务

- JavaScript是单线程的语言
- **Event Loop是javascript的执行机制**

 

**微任务(Microtasks)、宏任务(task)？**

**微任务和宏任务皆为异步任务，它们都属于一个队列，主要区别在于他们的执行顺序，Event Loop的走向和取值。那么他们之间到底有什么区别呢？**

 ![image-20210830104652527](C:\Users\长气\AppData\Roaming\Typora\typora-user-images\image-20210830104652527.png)



> js异步有一个机制，就是遇到宏任务，先执行宏任务，将宏任务放入eventqueue，然后在执行微任务，将微任务放入eventqueue最骚的是，这两个queue不是一个queue。当你往外拿的时候先从微任务里拿这个回掉函数，然后再从宏任务的queue上拿宏任务的回掉函数。 

 

**宏任务**

 

| **#**                 | **浏览器** | **Node** |
| --------------------- | ---------- | -------- |
| I/O                   | ✅          | ✅        |
| setTimeout            | ✅          | ✅        |
| setInterval           | ✅          | ✅        |
| setImmediate          | ❌          | ✅        |
| requestAnimationFrame | ✅          | ❌        |

有些地方会列出来UI Rendering，说这个也是宏任务，可是在读了[HTML规范文档](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)以后，发现这很显然是和微任务平行的一个操作步骤

requestAnimationFrame姑且也算是宏任务吧，requestAnimationFrame在[MDN的定义](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)为，下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行

 

**微任务**

| **#**                      | **浏览器** | **Node** |
| -------------------------- | ---------- | -------- |
| process.nextTick           | ❌          | ✅        |
| MutationObserver           | ✅          | ❌        |
| Promise.then catch finally | ✅          | ✅        |

 

 

**setTimeout/setInterval()** **⏲****不一定准确。主线程执行时间超出等待时间**

**最小延时 >=4ms**

在浏览器中，setTimeout()/[setInterval()](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrworkerGlobalScope/setInterval) 的每调用一次定时器的最小间隔是4ms，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的setInterval的回调函数阻塞导致的

**未被激活的tabs的定时最小延迟>=1000ms**

为了优化后台tab的加载损耗（以及降低耗电量），在未被激活的tab中定时器的最小延时限制为1S(1000ms)