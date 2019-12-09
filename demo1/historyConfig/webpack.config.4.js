// webpack 是node写的，所以用node的写法
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css抽离插件，插入html
const OptimizeCss = require('optimize-css-assets-webpack-plugin') // 压缩css
const Uglifyjs = require('uglifyjs-webpack-plugin') // 压缩js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin") // 模块编译速度
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({ // 增加模块编译速度插件
    mode: 'development', // 模式 默认两种 production development
    entry: {
        index: './src/index.js', // 入口文件
    },
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名 hash防止缓存问题
        path: path.resolve(__dirname, 'dist'), // 必须要为绝对路径
    },
    devServer: { // 开发服务器配置
        host: 'localhost', // 服务主机地址，默认localhost，0.0.0.0可供外部访问
        port: 3000, // 端口
        progress: true, // 输出运行进度到控制台
        contentBase: path.resolve(__dirname, 'dist'), // 服务目录
        open: true, // 自动打开浏览器
        compress: true, // gzip压缩, 启用gzip压缩的一切服务
        overlay: true // 编译出现错误时，将错误直接显示在页面上
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
        }),
        new MiniCssExtractPlugin({ // css抽离插件，插入html
            filename: '[name].[hash:8].css'
        })
    ],
    module: { // 模块
        rules: [ // 规则
            // { // 需要配置.eslintrc.json
            //     test: /\.js$/,
            //     include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            //     exclude: /node_modules/,  // 忽略目录
            //     use: {
            //         loader: 'eslint-loader', // 安装eslint、eslint-loader
            //         options: {
            //             // fix: true, // 自动修复
            //             enforce: 'pre' // previous、post 强制在其他loader前、后运行
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 忽略规则
                use: {
                    // loader: 'babel-loader', // es6 转 es5
                    loader: 'babel-loader?cacheDirectory=true', // 开启缓存加速
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            // '@babel/plugin-proposal-class-properties', // clase语法
                            ["@babel/plugin-proposal-decorators", {
                                "legacy": true
                            }], // 修饰器等高级语法
                            ["@babel/plugin-proposal-class-properties", {
                                "loose": true
                            }],
                            '@babel/plugin-transform-runtime' // @babel/runtime @babel/plugin-transform-runtime , grenarator等语法
                        ]
                    }
                }
            },
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
                    MiniCssExtractPlugin.loader, // 代替style-loader
                    'css-loader', // 解析 @import '' 语法
                    'postcss-loader' // 自动添加css前缀，需配置postcss.config.js  安装 postcss-loader autoprefixer
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // 解析 @import '' 语法， css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
                    'postcss-loader', // 注意顺序
                    'less-loader' // less -> css  npm i less less-loader -D
                ]
            }
        ]
    },
    optimization: { // 优化项  使用这就默认不压缩js， 需用 uglifyjs-webpack-plugin
        minimizer: [ // 最小化
            new Uglifyjs({ // 此处还不能处理es6代码，需要安装 babel-loader @babel/core @babel/preset-env
                cache: true, // 缓存
                parallel: true, // 并发压缩
                sourceMap: true // 源码映射
            }),
            new OptimizeCss() // 压缩css
        ]
    }
})