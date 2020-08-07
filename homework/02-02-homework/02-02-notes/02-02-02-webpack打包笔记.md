**模块化**

- 模块化标准
- es-module-loader
- 

**webpack**

- https://webpack.docschina.org/    √

- https://www.webpackjs.com/

- 注意：默认
  - 4.0以后`webpack`可以不需要配置文件，默认查找`src/index.js`文件，输出`dist/main.js`文件
  - webpack命令可以配置在`package.json`的scripts中
  
- 自定义
  
  - 自定义loader
  
  - loader只是一个导出为函数的javascript模块
  
    ```js
    module.exports=function(){
        
    }
    ```
  
- plugins

  - html-webpack-plugin
  - s
  - 开发一个自己的插件

- webpack-dev-server

  - 代理

    ```js
    proxy{
        "/api":{
            //http://localhost:8080/api/users=>https://api.github.com/api/users
            target:"https://api.github/com"，
            pathRewrite：{
                "^api":""
            }
        //http://localhost:8080/api/users=>https://api.github.com/users
               
        }
    }
    ```
    
  
- Source Map

  - 作用，解决了源代码与运行代码不一致所产生的问题。

  - webpack中配置Source map

    ```js
    module.exports = {
      mode: "none",
      entry: {
        index: "./src/index.js",
        detail: "./src/detail.js"
      },
      output: {
        filename: "[name].[hash:7].chunk.js"
      },
      devtool: "source-map"//配置Source Map
      }
    ```

- 不同环境下的配置

  - 配置文件根据环境不同导出不同配置 
    - 这种配置适合中小型项目
  - 一个环境对应一个配置文件 === 不同环境对应不同的配置文件

- webpack definePlugin

  - 为代码注入全局成员
  - process.env.NODE_ENV

- Tree-shaking

  - Tree Shaking的前提必须是ES Modules
  
- sideEffects [参考]([https://libin1991.github.io/2019/05/01/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3sideEffects%E9%85%8D%E7%BD%AE/](https://libin1991.github.io/2019/05/01/深入理解sideEffects配置/))

  [https://libin1991.github.io/2019/05/01/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3sideEffects%E9%85%8D%E7%BD%AE/](https://libin1991.github.io/2019/05/01/深入理解sideEffects配置/)

- 代码分割

  - 多入口打包

    - 一个页面一个打包文件 公共的提取出来

    ```js
    entry:{
        index:"./src/index.js",
        ablout:"./src/ablout.js"
    }
    output:{
        filename:'[name].bundle.js'
    }
    ```

    插件中

    ```js
    plugins:[
        new HtmlWebpackPlugin({
            title:"index",
            template:"./src/index.html",
            filename:"index.html",
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            title:"ablout",
            template:"./src/ablout.html",
            filename:"ablout.html",
            chunks:["ablout"]
        })
    ]
    ```

    [htmlwebpackplugin字段解释](https://segmentfault.com/a/1190000007294861)

  - 公共模块提取

    - 在优化配置当中开启一个叫splitchunks属性

      ```js
      optimization:{
          splitChunks:{
              chunks:"all"
          }
      }
      ```

      

  - 动态导入

    - 实现按需加载
    - 动态导入的模块会被自动分包

    ```js
    //利用ESModule的导入方式，得到的是一个promise对象
    let p = import("./a.js")
    p.then(function(module){
        console.log(module)
    })
    //module是一个对象
    //导出结果
    Module {default: "hello", __esModule: true, Symbol(Symbol.toStringTag): "Module"}
    default: "hello"
    Symbol(Symbol.toStringTag): "Module"
    __esModule: true
    __proto__: Object
    
    ```

  - webpack魔法注释

    ```js
    import(/*webpackChunkName:'components'*/./posts/posts).then()
    //打包后生产的文件名带chunkname
    ```

    

  - MiniCssExtractPlugin

    - 这是一个将css代码从打包结果中提取出来的插件

      ```js
      modules:{
          rules:[
              {
                  test:/\.css$/,
                  use:[
                      MiniCssExtractPlugin.loader， //不再使用style引入，通过link标签的方式注入了
                      'css-loader'
                  ]
              }
          ]
      }
      plugins:[
          new MiniCssExtractPlugin({
          	
      	})
      ]
      
      ```

  - OptimizeCssAssetsWebpackPlugin

    ```js
    plugins:[
        new MiniCssExtractPlugin() 
        new OptimizeCssAssetsWebpackPlugin()
    ]
    ```

    生产模式打包，只能打包js文件，css等文件不能够被打包，因为webpack内置插件只能打包js文件。其他需要下载对应插件。

    官方没有放在plugins中，放在plugins在任何场所都会工作,

    ```js
    module.exports = {
      optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ],
    ```

    

    

    

    

    

    



  

  

  






