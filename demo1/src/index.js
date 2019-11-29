// 运行npx webpack 运行本项目的webpack命令，而非全局安装的webpack
import model1 from './model1';
require('@babel/polyfill'); // 支持es7语法
require('./index.css');
require('./index.less');

let fn = function fn() {
  console.log('es6语法转es5'); // es6语法转es5
};

fn();

@log // 类装饰器
class A {
    a = 'es7语法支持';
} // es7语法支持

let a = new A();
console.log(a);

function log(target) {
  console.log('类装饰器:', target); // 高级语法转es5
}

function * gen () {
    yield 1;
}

console.log(gen().next());
console.log('includes语法：', '234234'.includes('2')); // es7语法

var varvar;
console.log('hello biu!!!', model1);