// // 运行npx webpack 运行本项目的webpack命令，而非全局安装的webpack
// import model1 from './model1';
// require('@babel/polyfill'); // 支持es7语法
// require('./index.css');
// require('./index.less');

// let fn = function fn() {
//   console.log('es6语法转es5'); // es6语法转es5
// };

// fn();

// @log // 类装饰器
// class A {
//     a = 'es7语法支持';
// } // es7语法支持

// let a = new A();
// console.log(a);

// function log(target) {
//   console.log('类装饰器:', target); // 高级语法转es5
// }

// function * gen () {
//     yield 1;
// }

// console.log(gen().next());
// console.log('includes语法：', '234234'.includes('2')); // es7语法

// var varvar;
// console.log('hello biu!!!', model1);

// // 暴露全局变量
// // expose-loader : pre前面执行的loader; normal普通loader;内联loader; 后置 postloader 
// // import $ from 'jquery'
// // import $ from 'expose-loader?$!jquery' // 内联loader
// // import $ from 'jquery' // loader配置
// import $ from 'jquery' // 被externals忽略打包
// console.log($, window.$) // expose-loader 将jquery暴露到window
// console.log('window:', window.$)

// webpack打包图片的处理
// 1、在js中创建图片
import logo from './logo.png' // 引入 配置file-loader就可以import引入图片了
console.log(logo)
let img = new Image()
img.src = logo
document.body.appendChild(img)
// 2、css引入 依赖file-loader
require('./index.css'); // background引入

// 3、标签引入
