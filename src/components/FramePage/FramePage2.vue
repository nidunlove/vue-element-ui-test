<template>
  <div style="width: 100%; height:inherit;">
    <el-container>
      <el-header class="contentHeader" style="">
        <h3>ES6 练习</h3>
      </el-header>
      <el-main >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button @click="test1()">test1变量的解构赋值</el-button>
          </el-col>
          <el-col :span="6"><el-button @click="test2()">test2函数扩展</el-button></el-col>
          <el-col :span="6"><el-button @click="test3('二',2,3)">test3字符串扩展</el-button><div id="inhtml"></div></el-col>
          <el-col :span="6"><el-button @click="test4()">test4数组扩展</el-button></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button @click="test5()">test5</el-button>
          </el-col>
          <el-col :span="6"><el-button @click="test6()">test6 ES7 async 练习</el-button></el-col>
          <el-col :span="6"><el-button @click="test7()">test7 Promise 练习</el-button></el-col>
          <el-col :span="6"><el-button @click="test8()">Generator 函数的语法</el-button></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button @click="test9()">test9 Class 练习</el-button>
          </el-col>
          <el-col :span="6"><el-button @click="test10()">test10</el-button></el-col>
          <el-col :span="6"><el-button @click="test11()">test11</el-button></el-col>
          <el-col :span="6"><el-button @click="test12()">test12</el-button></el-col>
        </el-row>
    </el-main>

    </el-container>

   
</div>
</template>

<script>


  export default {

    data() {
      return {

      }
    },
    created() {
     
    },
    methods: {
      init(){

      },
      test1(){
        //变量的解构赋值
        let [a,b,c] = [2,3]
        console.log(a,b,c);
        /////////////////////////
        let obj = {
          name:"aa",
          age: 23,
          myo:{
            a:"a"
          },
          action:()=>{
            console.log("action")
          }
        }
        let {name,age,myo:{aa}} = obj;
        console.log(name,age,aa);
        ////////////////////////////////////
        const [d,e,f,g,h] = "nidun";
        console.log(d,e,f,g,h);//n,i,d,u,n
        ////////////////////////////////////
        let {length:len} = "nidun";
        console.log(len);//5
        ////////////////////////////////////
        function add([x,y]) {
          return x+y;
        }
        console.log(add([2,4]));//6
        ////////////////////////////////////
        function move({x=0,y=0}={}){
          return [x,y];
        }
        move({x:1,y:8});
        move({y:8});
        move({x:1});
        move({})



      },
      test2(){
        //函数扩展
        function a1({a,b=9}){
          console.log({a,b}) 
        }
        a1(1,2);
        a1(1);
        a1(1,"");
        // a1();//报错
        function a2({a,b=9}={}){
          console.log({a,b}) 
        }
        a2();
        function fetch(url,{body="",method="GET",headers={}}={}){
          console.log(method);
        }
        fetch('http://github.com/nidunlove');//GET
      },

      test3(parm,a,b){
        //字符串扩展
        let htmlstr = `
          <span>哈哈哈${a*b}</span>
          ${parm}这个
          是
          字符串`;
        $("#inhtml").html(htmlstr);

        
      },
      test4(){
        //数组扩展
        console.log(...[1,3,4]);

        function mypush(arr,...items){
          arr.push(...items);
        }
        let a = [1,2]
        mypush(a,[3,4,5],[6,7],0)
        console.log(a);

        // ES5 的写法
        function f(x, y, z) {
          console.log(x, y, z);
        }
        var args1 = [0, 1, 2];
        f.apply(null, args1);

        // ES6的写法
        function f(x, y, z) {
          // ...
        }
        let args2 = [0, 1, 2];
        f(...args2);

        const [first, ...rest] = [1, 2, 3, 4, 5];
        console.log(first); // 1
        console.log(rest);  // [2, 3, 4, 5]

        // const [...butLast, last] = [1, 2, 3, 4, 5];
        // 报错
        // const [first, ...middle, last] = [1, 2, 3, 4, 5];
        // 报错
      },
      test5(){
        //
        const foo = 'bar';
        const baz = {foo};
        console.log(baz); // {foo: "bar"}

        // 等同于
        // const baz = {foo: foo};
        function f(x, y) {
          return {x, y};
        }
        // 等同于
        function f(x, y) {
          return {x: x, y: y};
        }
        f(1, 2) // Object {x: 1, y: 2}
        let birth = '2000/01/01';
        const Person = {
          name: '张三',
          //等同于birth: birth
          birth,
          // 等同于hello: function ()...
          hello() { console.log('我的名字是', this.name); }
        };
        console.log(Person);
      },
      test6(){
        // ES7 async 练习
        console.log("async");
         // https://www.jianshu.com/p/a138a525c287
          
          // 
          let axios = {  // mocks
            get: function(x) {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({data: x})
              }, 2000)
            })
          }}
          let query = 'mangos'

          async function fetchData(query) {
            try {
              const response = await axios.get(`/q?query=${query}`)
              const data = response.data
              return data
            } catch (error) {
              console.log(error)
            }
          }
          fetchData(query).then(data => {
            console.log(data) // Got data 2s later... Can use data!
          })

        // 作者：爱在西元钱
        // 链接：https://www.jianshu.com/p/a138a525c287
        // 來源：简书
        // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      },
      test7(){
        //Promise 练习
        setTimeout(function() {
          console.log(1)
        }, 0);
        new Promise(function executor(resolve) {
          console.log(2);
          for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();//注释掉 2 3 5 1
          }
          console.log(3);
        }).then(function() {
          console.log(4);
        });
        console.log(5);
      },
      test8(){
        //Generator 函数的语法
        //见readme 7.2 ，需要修改 babel
            function* myGenerator(argument) {
              yield 'yield1';
              console.log("S myGenerator",arguments);
              yield 'yield2';
              console.log("what happend？");
              let yieldval =  yield arguments[0] + arguments[1]
              console.log("yieldval",yieldval);
              yield yieldval;
              yieldval =  yield arguments[0] + arguments[1]
              yield yieldval;
              yieldval =  yield arguments[0] + arguments[1]//参数只会在初始化的时候赋值
              yield yieldval;
              yield yieldval;
              yield yieldval;
              yield yieldval;
              yield yieldval;
              return "return myGenerator"
            }
            var myGen = myGenerator(1);
            console.log(myGen);
            let next1 = myGen.next();
            console.log(myGen,next1);
             next1 = myGen.next();//此处打印 myGenerator arguments
            console.log(myGen,next1);
             next1 = myGen.next();
            console.log(myGen,next1);
             next1 = myGen.next();
            console.log(myGen,next1);

            var myGen2 = myGenerator(10,111);
            for (let i = 15; i >= 0; i--) {
              let next1 = myGen2.next(10,i);//i只会在初始化的时候赋值
              console.log(i,next1);
            }

            let obj = {
              * myGeneratorMethod() {
                //
              }
            };
          //等同
          obj = {
            myGeneratorMethod: function* () {
              // ···
            }
          };
          
      },
      
      test9(){
        //class 练习
        //类似于原生写法
        function Point(x, y) {
          this.x = x;
          this.y = y;
        }
        Point.prototype.toString = function () {
          return '(' + this.x + ', ' + this.y + ')';
        };
        var p = new Point(1, 2);
        console.log(p);
        //class 写法
        //定义类
        class Point2 {
          constructor(x, y) {
            this.x = x;
            this.y = y;
          }
          toString() {
            return '(' + this.x + ', ' + this.y + ')';
          }
        }
        var p2= new Point2(1, 2);
        console.log(p2);
        //类名为MyClass
        const MyClass = class Me {
          getClassName() {
            return Me.name;
          }
        };
        //
        let inst = new MyClass();
        inst.getClassName(); // Me
        //Me只在 Class 的内部代码可用，指代当前类。
        // Me.name // ReferenceError: Me is not defined
        const MyClass2 = class { /* ... */ };

        let person = new class {
          constructor(name) {
            this.name = name;
          }
          sayName() {
            console.log(this.name);
          }
        }('张三');
        person.sayName(); // "张三"
        //静态方法不会被继承
        class Foo {
          static classMethod() {
            return 'hello';
          }
        }

        Foo.classMethod() // 'hello'
        var foo = new Foo();
        // foo.classMethod()
        // TypeError: foo.classMethod is not a function
        // 如果静态方法包含this关键字，这个this指的是类，而不是实例。
        class Foo2 {
          static bar () {
            this.baz();
          }
          static baz () {
            console.log('hello');
          }
          baz () {
            console.log('world');
          }
        }
        Foo2.bar() // hello
        //静态方法可以与非静态方法重名。
        //父类的静态方法，可以被子类继承。
        class Foo3 {
          static classMethod() {
            return 'hello';
          }
        }
        class Bar extends Foo3 {
          static classMethod() {
            return super.classMethod() + ', too';
          }
        }
        Bar.classMethod() // "hello, too"
        
      },
      test10(){},
      test11(){},
      test12(){},


    },

    
  }
</script>

<style type="text/css">

</style>
