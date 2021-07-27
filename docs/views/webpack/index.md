# webpack初体验 (base 4.0+)
> 模块化打包工具，一切皆模块

## 历史
* grunt、gulp、fis
* requirejs
* parcel

## 参考文章
* [深入浅出webpack](http://webpack.wuhaolin.cn/)
* [webpack原理](https://juejin.im/entry/5b0e3eba5188251534379615)
* [webpack文档](https://www.webpackjs.com/concepts/)
* [完整webpack配置](https://www.webpackjs.com/configuration/)


## 核心概念
### Entry
> 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。

```
    // 单个入口
    entry: './path/to/my/entry/file.js'

    // 多个入口
    entry: ['./path/to/my/entry/file1.js', './path/to/my/entry/file2.js']

    // 对象语法
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
      }
```

### Output
> 输出结果，在 Webpack经过一系列处理并得出最终想要的代码后输出结果。，即使可以存在多个入口起点，但只指定一个输出配置。

```
    // 单个入口
    output: {
        filename: 'app.js',
        path: 'dist'
      }

    // 多个入口
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './dist')
      }
```

### Mode
> 告知 webpack 使用相应模式（plugin）的内置优化， 内置了development 和production，会将 process.env.NODE_ENV 的值设为 development

### Loader
> 模块转换器，用于把模块原内容按照需求转换成新内容。

```
    module: {
    rules: [
      {
        test: /\.css$/,
        include: '',
        exclude: 'node_module',
        use: [
          'css-loader?minimize',
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
        ]
      }
    ]
  }
```

### Plugin
> 扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。

```
     plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
```

### Module
> 在Webpack里一切皆模块，一个模块对应着一个文件。Webpack会从配置的Entry开始递归找出所有依赖的模块。

* ES2015 import 语句
* CommonJS require() 语句
* AMD define 和 require 语句
* css/sass/less 文件中的 @import 语句。
* 样式(url(...))或 HTML 文件img 标签中的图片链接(src)

