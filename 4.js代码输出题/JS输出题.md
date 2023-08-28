# JS输出题

## 一、异步&事件循环

~~~js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);

1 
2 
4
~~~

* promise.then 是微任务，它会在所有的宏任务执行完之后才会执行**(执行顺序)**；同时需要promise内部的状态发生变化，因为这里内部没有发生变化**(状态变化)**，一直处于pending状态；所以不输出3。



~~~js
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')	//状态变化
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);

promise1
1 Promise{<resolved>: resolve1}
2 Promise{<pending>}
resolve1
~~~

* **直接打印promise，会打印出它的状态值和参数。**



~~~js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {	//宏任务
    console.log("timerStart");
    resolve("success");	//状态变化
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);

1
2
4
timerStart
timerEnd
success
~~~

* **宏任务与微任务**



~~~js
const promise = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
});
promise.then((res) => {
    console.log('then:', res);
}).catch((err) => {
    console.log('catch:', err);
})

then：success1
~~~

* **Promise的状态在发生变化之后，就不会再发生变化**



~~~js
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  });

1   
2
~~~

* `resolve(1)`之后走的是第一个then方法，并没有进catch里，所以第二个then中的res得到的实际上是第一个then的返回值**（入口）**。并且return 2会被包装成`resolve(2)`，被最后的then打印输出2。



~~~js
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})

"then: " "Error: error!!!"
~~~

* **返回任意一个非 promise 的值都会被包裹成 promise 对象**，因此这里的`return new Error('error!!!')`也被包裹成了`return Promise.resolve(new Error('error!!!'))`，因此它会被then捕获而不是catch。



~~~js
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)

Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
~~~

* **`.then` 或 `.catch` 返回的值不能是 promise 本身**，否则会造成死循环。



~~~js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

1
~~~

* `.then` 或`.catch` 的参数期望是函数，传入非函数则会发生**值透传**。



~~~js
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })

1
finally2
finally
finally2后面的then函数 2
~~~

* `.finally()`方法不管Promise对象最后的状态如何都会执行**（总会执行）**
* `.finally()`方法的回调函数不接受任何的参数，也就是说你在`.finally()`函数中是无法知道Promise最终的状态是`resolved`还是`rejected`的**（参数无效）**
* 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象**（返回Promise）**
* finally本质上是then方法的特例**（形同then）**



~~~js
function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    return p
}

Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then(res => console.log(res))

1
2
3
[1, 2, 3]
~~~

* **一秒之后**输出了1，2，3，**同时输出**了数组[1, 2, 3]，三个函数是同步执行的，并且在一个回调函数中返回了所有的结果



~~~js
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log('result: ', res))
  .catch(err => console.log(err))
~~~

* **then只会捕获第一个成功的方法**，其他的函数虽然还会继续执行，但不是被then捕获



## 二、this

~~~js
function foo() {
  console.log( this.a );
}

function doFoo() {
  foo();
}

var obj = {
  a: 1,
  doFoo: doFoo
};

var a = 2; 
obj.doFoo()

2
~~~

* this指向函数执行时的当前对象。在执行foo的时候，执行环境就是doFoo函数，**执行环境为全局**。所以，foo中的**this是指向window**的，所以会打印出2。



~~~js
var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}
obj.say() 

var anotherObj = { a: 30 } 
obj.say.apply(anotherObj) 

10 10
~~~

* **箭头函数是不绑定this的，它的this来自原其父级所处的上下文**；如果是普通函数输出就是20,30



~~~js
function a() {
  console.log(this);
}
a.call(null);

window对象
~~~

* **规定：如果第一个参数传入的对象调用者是null或者undefined，call方法将把全局对象（浏览器上是window对象）作为this的值**



~~~js
var obj = { 
  name : 'cuggz', 
  fun : function(){ 
    console.log(this.name); 
  } 
} 
obj.fun()     // cuggz
new obj.fun() // undefined
~~~

* 使用**new**构造函数时，其**this指向的是全局环境window**



~~~js
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log(this.foo);  
        console.log(self.foo);  
        (function() {
            console.log(this.foo);  
            console.log(self.foo);  
        }());
    }
};
myObject.func();

bar bar undefined bar
~~~

* **立即执行匿名函数**表达式是由window调用的，**this指向window**，所以输出为undefined



~~~js
function a(xx){
  this.x = xx;
  return this
};
var x = a(5);
var y = a(6);

console.log(x.x)  // undefined
console.log(y.x)  // 6
~~~

* 这里函数内部的this指向window对象



~~~js
function foo(something){
    this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
~~~

* **this绑定的优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**



## 三、作用域&变量提升&闭包

~~~js
(function(){
   var x = y = 1;
})();
var z;

console.log(y); // 1
console.log(z); // undefined
console.log(x); // Uncaught ReferenceError: x is not defined
~~~

* var x = y = 1; 实际上这里是**从右往左**执行的，x是一个**局部变量**，y是一个**全局变量**



~~~js
var a, b
(function () {
   console.log(a);
   console.log(b);
   var a = (b = 3);
   console.log(a);
   console.log(b);   
})()
console.log(a);
console.log(b);

undefined 
undefined 
3 
3 
undefined 
3
~~~

* 同上，b赋值为3，b此时是一个**全局变**量，而将3赋值给a，a是一个**局部变量**



~~~js
var friendName = 'World';
(function() {//var friendName
  if (typeof friendName === 'undefined') {//此处会发生变量提升
    var friendName = 'Jack';
    console.log('Goodbye ' + friendName);
  } else {
    console.log('Hello ' + friendName);
  }
})();
~~~

* **变量提升**



~~~js
function a() {
    var temp = 10;
    function b() {
        console.log(temp); // 10
    }
    b();
}
a();

function a() {
    var temp = 10;
    b();
}
function b() {
    console.log(temp); // 报错 Uncaught ReferenceError: temp is not defined
}
a();
~~~

* 访问不到



~~~js
 var a=3;
 function c(){
    alert(a);
 }
 (function(){
  var a=4;
  c();    //3  在自执行函数中没有a变量，会沿着作用域链向上寻找，与定义的作用域有关，与执行作用域无关
 })();
--------------------------------------
var a=3;
 function c(a){
    alert(a);
 }
 (function(){
  var a=4;
  c(a);  //4  执行c函数时，先进行形参赋值，再执行的作用域查找
 })();
~~~



~~~js
function fun(n, o) {
  console.log(o)
  return {
    fun: function(m){
      return fun(m, n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);

undefined  0  0  0
undefined  0  1  2
undefined  0  1  1
~~~



## 四、原型&继承

~~~js
function Person(name) {
    this.name = name
}
var p2 = new Person('king');

console.log(p2.__proto__) //Person.prototype
console.log(p2.__proto__.__proto__) //Object.prototype
console.log(p2.__proto__.__proto__.__proto__) // null
console.log(p2.__proto__.__proto__.__proto__.__proto__)//null后面没有了，报错
console.log(p2.__proto__.__proto__.__proto__.__proto__.__proto__)//null后面没有了，报错

console.log(p2.constructor)//Person
console.log(p2.prototype)//undefined p2是实例，没有prototype属性

console.log(Person.constructor)//Function 一个空函数
console.log(Person.prototype)//打印出Person.prototype这个对象里所有的方法和属性
console.log(Person.prototype.constructor)//Person
console.log(Person.prototype.__proto__)// Object.prototype
console.log(Person.__proto__) //Function.prototype

console.log(Function.prototype.__proto__)//Object.prototype
console.log(Function.__proto__)//Function.prototype

console.log(Object.__proto__)//Function.prototype
console.log(Object.prototype.__proto__)//null
~~~

* 原型和原型链基础



~~~js
// a
function Foo () {
 getName = function () {
   console.log(1);
 }
 return this;
}
// b
Foo.getName = function () {
 console.log(2);
}
// c
Foo.prototype.getName = function () {
 console.log(3);
}
// d
var getName = function () {
 console.log(4);
}
// e
function getName () {
 console.log(5);
}

Foo.getName();           // 2
getName();               // 4
Foo().getName();         // 1
getName();               // 1 
new Foo.getName();       // 2
new Foo().getName();     // 3
new new Foo().getName(); // 3
~~~

* **Foo.getName()，** Foo为一个函数对象，对象都可以有属性，b 处定义Foo的getName属性为函数，输出2；
* **getName()，** 这里看d、e处，d为函数表达式，e为函数声明，两者区别在于变量提升，函数声明的 5 会被后边函数表达式的 4 覆盖；
* **Foo().getName()，** 这里要看a处，在Foo内部将全局的getName重新赋值为 console.log(1) 的函数，执行Foo()返回 this，这个this指向window，Foo().getName() 即为window.getName()，输出 1；
* **getName()，** 上面3中，全局的getName已经被重新赋值，所以这里依然输出 1；
* **new Foo.getName()，** 这里等价于 new (Foo.getName())，先执行 Foo.getName()，输出 2，然后new一个实例；
* **new Foo().getName()，** 这 里等价于 (new Foo()).getName(), 先new一个Foo的实例，再执行这个实例的getName方法，但是这个实例本身没有这个方法，所以去原型链__protot__上边找，实例.**protot** === Foo.prototype，所以输出 3；
* **new new Foo().getName()，** 这里等价于new (new Foo().getName())，如上述6，先输出 3，然后new 一个 new Foo().getName() 的实例。



~~~js
var F = function() {};
Object.prototype.a = function() {
  console.log('a');
};
Function.prototype.b = function() {
  console.log('b');
}
var f = new F();
f.a();
f.b();
F.a();
F.b()

a
Uncaught TypeError: f.b is not a function
a
b
~~~

* 沿着原型链访问不到



~~~js
function Foo(){
    Foo.a = function(){
        console.log(1);
    }
    this.a = function(){
        console.log(2)
    }
}

Foo.prototype.a = function(){
    console.log(3);
}

Foo.a = function(){
    console.log(4);
}

Foo.a(); //4
let obj = new Foo();
obj.a(); //2
Foo.a(); //1
~~~

* Foo.a() 这个是调用 Foo 函数的静态方法 a，虽然 Foo 中有优先级更高的属性方法 a，但 Foo 此时没有被调用，所以此时输出 Foo 的静态方法 a 的结果：4
* let obj = new Foo(); 使用了 new 方法调用了函数，返回了函数实例对象，此时 Foo 函数内部的属性方法初始化，原型链建立。
* obj.a() ; 调用 obj 实例上的方法 a，该实例上目前有两个 a 方法：一个是内部属性方法，另一个是原型上的方法。当这两者都存在时，首先查找 ownProperty ，如果没有才去原型链上找，所以调用实例上的 a 输出：2
* Foo.a() ; 根据第2步可知 Foo 函数内部的属性方法已初始化，覆盖了同名的静态方法，所以输出：1



~~~js
var A = {n: 4399};
var B =  function(){this.n = 9999};
var C =  function(){var n = 8888};
B.prototype = A;
C.prototype = A;
var b = new B();
var c = new C();
A.n++
console.log(b.n); //9999
console.log(c.n); //4400
~~~

* console.log(b.n)，在查找b.n是首先查找 b 对象自身有没有 n 属性，如果没有会去原型（prototype）上查找，当执行var b = new B()时，函数内部this.n=9999(此时this指向 b) 返回b对象，b对象有自身的n属性，所以返回 9999。
* console.log(c.n)，同理，当执行var c = new C()时，c对象没有自身的n属性，向上查找，找到原型 （prototype）上的 n 属性，因为 A.n++(此时对象A中的n为4400)， 所以返回4400。



~~~js
function Dog() {
  this.name = 'puppy'
}
Dog.prototype.bark = () => {
  console.log('woof!woof!')
}
const dog = new Dog()
console.log(Dog.prototype.constructor === Dog && dog.constructor === Dog && dog instanceof Dog)
~~~

* 因为constructor是prototype上的属性，所以dog.constructor实际上就是指向Dog.prototype.constructor；constructor属性指向构造函数。instanceof而实际检测的是类型是否在实例的原型链上。
* constructor是prototype上的属性，这一点很容易被忽略掉。constructor和instanceof 的作用是不同的，感性地来说，constructor的限制比较严格，它只能严格对比对象的构造函数是不是指定的值；而instanceof比较松散，只要检测的类型在原型链上，就会返回true。



## 五、真题

**= = 和 = = =的区别，undefined = = = null(false)、undefined = = null(true)、[] = = = ''(false)、[] = = ''(true)**

**var a = 1(number)；var b = new Number(1);(object) 使用typeof两者分别输出什么**

**JS原型链相关问题**

~~~js
let a=1;
console.log(a);

let b=setTimeout(function(){
    console.log('2');
},0);

let c=new Promise(function(resolve,reject){
    console.log('3');
    resolve();
})

let d=setTimeout(function(){
    console.log('4');
},0);

c.then(()=>{
    console.log('5');
})
//1 3 5 4 2 事件循环机制 宏任务 -- 微任务 -- 下一轮
~~~

~~~js
var a
if(!a){
var a = 2
  console.log(a)
}
a=1
console.log(a)
//2 1
~~~

~~~js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();  // 333 var函数作用域
~~~

~~~js
let x = 3;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
let f = fn(4)(5);
console.log(x);// 10 3
~~~

~~~js
"use strict";
var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1() // person1 正常
person1.show1.call(person2) // person2 绑定

person1.show2() // window 箭头函数没this
person1.show2.call(person2) // window 箭头函数不能改this

person1.show3()() // window this指向的是全局对象
person1.show3().call(person2) // person2
~~~

~~~js
var a = 1;
function fnB() {
	var a = 2;
	return () => {
		a++;
		console.log(a);
		fnA();
	};
}
function fnA() {
	console.log(a);
}
fnB()();
//3 1
~~~

~~~js
var a = 1;
console.log(a);

setTimeout(()=> {
  console.log(2);
}, 0);

function func2() {
  console.log(3);
}

async function func1() { // 注意这里会返回一个promise，也是异步任务/微任务
  await func2();
  console.log(4);
}

var b = new Promise((resolve)=> {
    console.log(5);
   resolve();
});

setTimeout(()=> {
    console.log(6);
}, 0);

b.then(()=> {
   console.log(7);
});

func1();

// 输出 1 5 3 4 7 2 6
~~~



## 六、选择题

**1. parseInt 遇上 map**

```
["1", "2", "3"].map(parseInt)
// other
```

实际上返回的结果是 **[1, NaN, NaN]** ，因为 parseInt 函数只需要两个参数 parseInt(value, radix) ，而 map 的回调函数需要三个参数 callback(currentValue, index, array)。MDN文档中指明 parseInt 第二个参数是一个2到36之间的整数值，用于指定转换中采用的基数。如果省略该参数或其值为0，则数字将以10为基础来解析。如果该参数小于2或者大于36，则 parseInt 返回 NaN。此外，转换失败也会返回 NaN。现在来分析问题。**parseInt("1", 0) 的结果是当作十进制来解析，返回 1；parseInt("2", 1) 的第二个参数非法，返回 NaN；parseInt("3", 2) 在二进制中，"3" 是非法字符，转换失败，返回 NaN。**



**2. 神奇的null**

```
[typeof null, null instanceof Object]

// ["object", false]
```

**typeof null 的结果是 "object**。instanceof 运算符是用来测试一个对象在其原型链构造函数上是否具有 prototype 属性，null 值并不是以 Object 原型创建出来的，所以 **null instanceof Object 返回 false**。



**3. 愤怒的reduce**

```
[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]

// an error
```

如果**数组为空并且没有提供initialValue， 会抛出TypeError** 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。



**4. 该死的优先级**

```
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');

// other
```

实际上**输出 "Something"**，因为 + 的优先级比条件运算符 condition ? val1 : val2 的优先级高，即字符串连接比三元运算有更高的优先级。原题等价于 'Value is true' ? 'Somthing' :'Nonthing'。



**5. 神鬼莫测之变量提升**

```
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
      var name = 'Jack';
      console.log('Goodbye ' + name);
    } else {
      console.log('Hello ' + name);
    }
})();

// Goodbye Jack
```

在 JavaScript中， functions 和 variables 会被提升。**变量提升是JavaScript将声明移至作用域 scope (全局域或者当前函数作用域) 顶部的行为。**所以，上面的代码与下面这段代码是等价的：

```
var name = 'World!';
(function () {
    var name;
    if (typeof name === 'undefined') {
      name = 'Jack';
      console.log('Goodbye ' + name);
    } else {
      console.log('Hello ' + name);
    }
})();
```



**6. 死循环陷阱**

```
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) { 
  count++;
}
console.log(count);

// other
```

在JavaScript中，2^53 是最大的值，没有比这更大的值了。所以 **2^53 + 1 == 2^53，这个循环无法终止**。



**7. 过滤器魔法**

```
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) {
  return x === undefined;
});

// []
```

filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。**callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。**那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。



**8. 警惕IEEE 754标准**

```
var two = 0.2;
var one = 0.1;
var eight = 0.8;
var six = 0.6;
[two - one == one, eight - six == two]

// [true, false]
```

JavaScript中采用双精度浮点数格式，**即IEEE 754标准。在该格式下，有些数字无法表示出来**，比如：0.1 + 0.2 = 0.30000000000000004 ，这不是JavaScript的锅，所有采用该标准的语言都有这个问题，比如：Java、Python等。



**9. 字符串陷阱**

```
function showCase(value) {
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A'));

// Do not know!
```

在 **switch 内部使用严格相等 === 进行判断**，并且 new String("A") 返回的是一个对象，而 String("A") 则是直接返回字符串 "A"。你也可以参考MDN中对原始字符串和String对象的区分：



**10. 再一次的字符串陷阱**

```
function showCase(value) {
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(String('A'));

// Case A
```

与上面唯一不同的是没有使用 new 关键字，所以直接返回字符串，实际上，typeof string("A") === "string" 的结果是 true。



**11. 并非都是奇偶**

```
function isOdd(num) {
  return num % 2 == 1;
}

function isEven(num) {
  return num % 2 == 0;
}

function isSane(num) {
  return isEven(num) || isOdd(num);
}

var values = [7, 4, "13", -9, Infinity];
values.map(isSane);

// [true, true, true, false, false]
```

**-9 % 2 = -1 以及 Infinity % 2 = NaN**，求余运算符会保留符号，所以只有 isEven 的判断是可靠的。



**12. parseInt小贼**

```
parseInt(3, 8);
parseInt(3, 2);
parseInt(3, 0);

other
```

实际结果是 3, NaN, 3。



**13. 数组原型是数组**

```
Array.isArray( Array.prototype )

// true
```

一个鲜为人知的事实：其实 Array.prototype 也是一个数组。



**14. 一言难尽的强制转换**

```
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}

// false
```

当 [0] 需要被强制转成 Boolean 的时候会被认为是 true。所以进入第一个 if 语句，规范指出，== 相等中，如果有一个操作数是布尔类型，会先把他转成数字，所以比较变成了 [0] == 1；同时规范指出如果其他类型和数字比较，会尝试把这个类型转成数字再进行宽松比较，而对象（数组也是对象）会先调用它的 toString() 方法，此时 [0] 会变成 "0"，然后将字符串 "0" 转成数字 0，而 0 == 1 的结果显然是 false。



**15. 撒旦之子“==”**

```
[]==[]

// false
```

ES5规范指出：如果**比较的两个对象指向的是同一个对象，就返回 true，否则就返回 false**，显然，这是两个不同的数组对象。



**16. 加号 VS 减号**

```
'5' + 3;
'5' - 3;

// "53", 2
```

"5" + 2 = "52" 很好理解，+ 运算符中只要有一个是字符串，就会变成字符串拼接操作。你不知道的是，- 运算符要求两个操作数都是数字，如果不是，会强制转换成数字，所以结果就变成了 5 - 2 = 3。



**17. 打死那个疯子**

```
1 + - + + + - + 1

// 2
```

你只要知道 + 1 = 1和- 1 = -1，注意符号之间的空格。**两个减号抵消**，所以最终结果等效于 1 + 1 = 2。或者你也可以在符号之间**插入 0** 来理解，即 1 + 0 - 0 + 0 + 0 + 0 - 0 + 1。



**18. 淘气的map**

```
var ary = Array(3);
ary[0] = 2;
ary.map(function(elem) {
  return "1";
});

// other
```

实际上结果是 **["1", undefined,undefined]**



**19. 统统算我的**

```
function sidEffecting(ary) {
  ary[0] = ary[2];
}

function bar(a, b, c) {
  c = 10;
  sidEffecting(arguments);
  return a + b + c;
}

bar(1, 1, 1);

// other
```

**实际上结果是 21**。在JavaScript中，参数变量和 arguments 是双向绑定的。改变参数变量，arguments 中的值会立即改变；而改变 arguments 中的值，参数变量也会对应改变。



**20. 损失精度的IEEE 754**

```
var a = 111111111111111110000;
var b = 1111;
console.log(a + b);

// 111111111111111110000
```

这是IEEE 754规范的黑锅，不是JavaScript的问题。表示这么大的数占用过多位数，会丢失精度。



**21. 反转世界**

```
var x = [].reverse;
x();

// window
```

MDN规范关于 reverse 的描述：**reverse 方法颠倒数组中元素的位置，并返回该数组的引用**。而这里调用的时候没有制定数组，所以默认的 this 就是 window，所以最后结果返回的是 window。



**22. 最小的正值**

```js
Number.MIN_VALUE > 0

// true
```

**MIN_VALUE属性是 JavaScript 里最接近 0 的正值，而不是最小的负值**。MIN_VALUE的值约为 5e-324。小于 MIN_VALUE
("underflow values") 的值将会转换为 0。



**23. 谨记优先级**

```
[1 < 2 < 3, 3 < 2 < 1]

// [true, true]
```

**<和>的优先级都是从左到右**，所以 1 < 2 < 3 会先比较 1 < 2，这会得到 true，但是 < 要求比较的两边都是数字，所以会发生**隐式强制转换**，将 true 转换成 1，所以最后就变成了比较 1 < 3，结果显然为 true。同理可以分析后者。



**24. 坑爹中的战斗机**

```
// the most classic wtf
2 == [[[2]]]

// true
```

根据ES5规范，如果比较的两个值中有一个是数字类型，就会尝试将另外一个值强制转换成数字，再进行比较。而**数组强制转换成数字的过程会先调用它的 toString方法转成字符串，然后再转成数字**。所以 [2]会被转成 "2"，然后递归调用，最终 [[[2]]] 会被转成数字 2。



**25. 小数点魔术**

```
3.toString();
3..toString();
3...toString();

// error, "3", error
```

点运算符会被优先识别为数字常量的一部分，然后才是对象属性访问符。所以 **3.toString() 实际上被JS引擎解析成 (3.)toString()**，显然会出现语法错误。但是如果你这么写 (3).toString()，人为加上括号，这就是合法的。



**26. 自动提升为全局变量**

```
(function() {
  var x = y = 1;
})();
console.log(y);
console.log(x);

// 1, error
```

很经典的例子，在函数中**没有用 var 声明变量 y，所以 y 会被自动创建在全局变量 window下面**，所以在函数外面也可以访问得到。而 x 由于被 var 声明过，所以在函数外部是无法访问的。



**27. 正则表达式实例**

```
var a = /123/;
var b = /123/;
a == b;
a === b;

// false, false
```

**每个字面的正则表达式都是一个单独的实例，即使它们的内容相同。**



**28. 数组也爱比大小**

```
var a = [1, 2, 3];
var b = [1, 2, 3];
var c = [1, 2, 4];

a == b;
a === b;
a > c;
a < c;

// false, false, false, true
```

答案是A。数组也是对象，ES5规范指出如果两个对象进行相等比较，只有在它们指向同一个对象的情况下才会返回 true，其他情况都返回 false。而**对象进行大小比较，会调用 toString 方法转成字符串进行比较**，所以结果就变成了字符串 "1,2,3" 和 "1,2,4" 按照字典序进行比较了。



**29. 原型把戏**

```
var a = {};
var b = Object.prototype;

[a.prototype === b, Object.getPrototypeOf(a) == b]

// [false, true]
```

**对象是没有 prototype 属性的，所以 a.prototype 是 undefined**，但我们可以通过 Object.getPrototypeOf 方法来获取一个对象的原型。



**30. 构造函数的函数**

```
function f() {}
var a = f.prototype;
var b = Object.getPrototypeOf(f);
a === b;

// false
```

`a` 和 `b` 分别是通过不同方式获取 `f` 函数的原型对象。

- `a = f.prototype` 获取的是 `f` 函数的原型对象。在 JavaScript 中，每个函数都有一个 `prototype` 属性，它指向该函数的原型对象。因此，`a` 变量将引用 `f` 函数的原型对象。
- `b = Object.getPrototypeOf(f)` 使用 `Object.getPrototypeOf()` 方法获取 `f` 函数的原型对象。这个方法返回指定对象的原型（`__proto__`），相当于获取 `f` 函数的 `[[Prototype]]`。

由于原型对象是 JavaScript 中的对象，而对象在比较时是按引用进行比较的，所以 `a === b` 表达式返回的结果为 `false`，即 `a` 不等于 `b`。要注意的是，**`f.prototype` 和 `Object.getPrototypeOf(f)` 虽然返回的是同一个原型对象，但是它们是通过不同的方式获取的，因此在引用比较时会返回 `false`**。



**31. 禁止修改函数名**

```
function foo() {}
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name];

// ["foo", "foo"]
```

**函数名是禁止修改的**，规范写的很清楚，所以这里的修改无效。



**32. 替换陷阱**

```
"1 2 3".replace(/\d/g, parseInt);

// "1 NaN 3"
```

如果 replace 方法第二个参数是一个函数，则会在匹配的时候多次调用，第一个参数是匹配的字符串，第二个参数是匹配字符串的下标。所以变成了调用 **parseInt(1, 0)、parseInt(2, 2)和parseInt(3, 4)**，结果你就懂了。



**33. Function的名字**

```
function f() {}
var parent = Object.getPrototypeOf(f);
console.log(f.name);
console.log(parent.name);
console.log(typeof eval(f.name));
console.log(typeof eval(parent.name));

//  other
```

代码中的 parent 实际上就是 Function.prototype，而它在控制台中输出为：

```
function () {
  [native code]
}
```

它的 name 属性是 ""，所以 **eval("")是得不到任何东西的**。



**34. 正则测试陷阱**

```
var lowerCaseOnly = /^[a-z]+$/;
[lowerCaseOnly.test(null), lowerCaseOnly.test()]

// [true, true]
```

**test 方法的参数如果不是字符串，会经过抽象 ToString操作强制转成字符串**，因此实际上测试的是字符串 "null" 和 "undefined"。



**35. 逗号定义数组**

```
[,,,].join(", ")

// ", , "
```

JavaScript允许用逗号来定义数组，得到的数组是含有3个 undefined 值的数组。MDN关于 join 方法的描述：所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。如果**元素是undefined 或者null， 则会转化成空字符串**。



**36. 保留字 class**

```
var a = {class: "Animal", name: "Fido"};
console.log(a.class);

// other
```

实际上真正的答案取决于浏览器。**class 是保留字**，但是在Chrome、Firefox和Opera中可以作为属性名称，在IE中是禁止的。另一方面，其实所有浏览器基本接受大部分的关键字（如：int、private、throws等）作为变量名，而class是禁止的。



**37. 无效日期**

```
var a = new Date("epoch");

// other
```

实际结果是 Invalid Date，它实际上是一个Date对象，因为 a instance Date 的结果是 true，但是它是无效的Date。**Date对象内部是用一个数字来存储时间的，在这个例子中，这个数字是 NaN**。



**38. 神鬼莫测的函数长度**

```
var a = Function.length;
var b = new Function().length;
console.log(a === b);

// false
```

实际上a的值是1，b的值是0。还来看MDN文档关于 Function.length 的描述。

**Function构造器的属性：Function 构造器本身也是个Function。他的 length 属性值为 1 。**该属性 Writable: false, Enumerable: false, Configurable: true。

**Function原型对象的属性：Function原型对象的 length 属性值为 0 。**

所以，在本例中，a代表的是 Function 构造器的 length 属性，而b代表的是 Function 原型的 length 属性。



**39. Date的面具**

```
var a = Date(0);
var b = new Date(0);
var c = new Date();
[a === b, b === c, a === c];

// [false, false, false]
```

先看MDN关于Date对象的注意点：需要注意的是只能通过调用 Date 构造函数来实例化日期对象：以常规函数调用它（即不加 new 操作符）将会返回一个字符串，而不是一个日期对象。另外，不像其他JavaScript 类型，Date 对象没有字面量格式。所以**a是字符串，b和c是Date对象，并且b代表的是1970年那个初始化时间，而c代表的是当前时间。**



**40. min与max共舞**

```
var min = Math.min();
var max = Math.max();
console.log(min < max);

// false
```

看MDN文档，对 Math.min的描述：如果没有参数，结果为Infinity。对 Math.max 的描述：如果没有参数，结果为-Infinity。



**41. 警惕全局匹配**

```
function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}

var numRe = /num=(\d+)/ig,
      wordRe = /word=(\w+)/i,
      a1 = captureOne(numRe, "num=1"),
      a2 = captureOne(wordRe, "word=1"),
      a3 = captureOne(numRe, "NUM=1"),
      a4 = captureOne(wordRe, "WORD=1");

[a1 === a2, a3 === a4]
//1 1 null null
// [true, false]
```

看MDN关于 exec 方法的描述：当正则表达式使用 "g" 标志时，可以多次执行 exec 方法来查找同一个字符串中的成功匹配。当你这样做时，查找将从正则表达式的  lastIndex 属性指定的位置开始。所以a3的值为 null。



**42. 最熟悉的陌生人**

```
var a = new Date("2014-03-19");
var b = new Date(2014, 03, 19);
[a.getDay() == b.getDay(), a.getMonth() == b.getMonth()]

// [false, false]
```

`a` 是通过传递一个包含日期字符串 `"2014-03-19"` 给 `Date` 构造函数来创建的。这个日期字符串采用 ISO 8601 格式表示年份、月份和日期。`b` 是通过传递年、月和日作为参数 `2014, 03, 19` 给 `Date` 构造函数创建的。在 JavaScript 中，月份从 0 开始计数，**所以 `03` 实际上表示四月。**

`a.getDay()` 和 `b.getDay()` 返回的是日期对象的星期几（从 0 到 6，分别代表周日到周六）。由于 `a` 表示的日期为 2014 年 3 月 19 日，星期三（`getDay()` 返回 3），而 `b` 表示的日期为 2014 年 4 月 19 日，星期六（`getDay()` 返回 6）。所以，`a.getDay() == b.getDay()` 返回 `false`。

`a.getMonth()` 和 `b.getMonth()` 返回的是日期对象的月份（从 0 到 11，分别代表一月到十二月）。由于 `a` 表示的日期为 2014 年 3 月 19 日，月份为 2（`getMonth()` 返回 2），而 `b` 表示的日期为 2014 年 4 月 19 日，月份为 3（`getMonth()` 返回 3）。所以，`a.getMonth() == b.getMonth()` 返回 `false`。



**43. 匹配隐式转换**

```
if("http://giftwrapped.com/picture.jpg".match(".gif")) {
  console.log("a gif file");
} else {
  console.log("not a gif file");
}

// "a gif file"
```

看MDN对 match 方法的描述：如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj)。将其转换为正则表达式对象。所以我们的字符串 **".gif" 会被转换成正则对象 /.gif/**，**会匹配到 "/gif"**。



**44. 重复声明变量**

```
function foo(a) {
  var a;
  return a;
}

function bar(a) {
  var a = "bye";
  return a;
}

[foo("hello"), bar("hello")]

// ["hello", "bye"]
```

一个变量在同一作用域中已经声明过，会自动移除 var 声明，但是赋值操作依旧保留，结合前面提到的**变量提升机制**，就明白了。

