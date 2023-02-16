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
