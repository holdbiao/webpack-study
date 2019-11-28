// webpack 是node写的，所以用node的写法
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production', // 模式 默认两种 production development
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.[hash:8].js', // 打包后的文件名 hash防止缓存问题
        path: path.resolve(__dirname, 'dist'), // 必须要为绝对路径
    },
    devServer: { // 开发服务器配置
        port: 3000, // 端口
        progress: true, // 打包进度条
        contentBase: './dist',  // 服务目录
        open: true, // 自动打开浏览器
        compress: true, // gzip压缩
    },
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成html模版
            template: './src/index.html', // 模版
            filename: 'index.html', // 打包后名字
            minify: {
                removeAttributeQuotes: true, // 删除模版双引号
                collapseWhitespace: true // 压缩成一行
            },
            hash: true // 增加hash bundle.js?87f9461b729bd1694630
        })
    ],
    module: { // 模块
        rules: [ // 规则
            // css-loader 解析 @import '' 这种语法的
            // style-loader 他是把css插入到head标签中
            // loader 的特点，希望单一
            // loader 的用法，字符串只用一个loder
            // 多个loader需要 []
            // loader的顺序 默认是从右到左执行  从下到上执行
            // loader可以携程对象形式 可配置options
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        // options: {
                        //     insertAt: 'top' // 插入位置，默认最后
                        // }
                    },
                    'css-loader' // 解析 @import '' 语法
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    'css-loader', // 解析 @import '' 语法
                    'less-loader' // less -> css  npm i less less-loader -D
                ]
            }
        ]
    }
}