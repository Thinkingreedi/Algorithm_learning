# JS输出题

## 一、异步&事件循环







## 二、this









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









