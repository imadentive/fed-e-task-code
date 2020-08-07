**脚手架**

- 脚手架的本质作用

  - 创建项目基础结构，提供项目规范和约定
    - 相同的组织结构
    - 相同的开发范式
    - 相同的模块依赖
    - 相同的工具配置
    - 相同的代码基础

- 常用脚手架工具

  - 服务自身项目的一类
    - create-react-app
    - vue-cli
    - angular-cli
  - 通用性脚手架工具
    - yeoman
  - 创建特定类型的脚手架
    - plop

- 脚手架学习

  - yeoman

    - 一款高效，开源的web应用脚手架搭建系统，专注提供脚手架功能。并不是针对某个项目，没有针对性。

    - yeoman使用

      - 安装  yarn global add yo

      - yo必须搭配特定的generator使用，需要找到对应的generator

        -  generator-node为例

        ```js
        C:\Users\123\Desktop\blogs\modules\app>yo node
        ? Module Name (app)
        ? Description
        ? Project homepage url
        ? Author's Name (cuiweijun)
        ? Author's Email (834719201@qq.com)
        ? Author's Homepage ()
        ? Package keywords (comma to split) test node 
        ? Send coverage reports to coveralls (Y/n)
        ? Enter Node versions (comma separated)
        ? GitHub username or organization (cuiweijun)
        ? Which license do you want to use? (Use arrow keys)
          Apache 2.0
        > MIT
          Mozilla Public License 2.0
          BSD 2-Clause (FreeBSD) License
          BSD 3-Clause (NewBSD) License
          Internet Systems Consortium (ISC) License
          GNU AGPL 3.0
        (Move up and down to reveal more choices)
        
        I'm all done. Running npm install for you to install the required dependencies. If this fails, try running the command yourself. 下载状态
        ```

        ![image-20200602124837699](image-20200602124837699.png)

        下载完后会出现卡死状态 按下回车就ok。

        生成一个node的项目结构就出来了。
      
    - 自定义generator

      - Generator本质就是一个npm的模块

      - Generator的基本结构

        - 必须有一个generators的文件夹
          - 文件夹下有个叫app的文件夹   存放生成器对应的代码
            - app文件夹里有个index.js的文件

        ```js
        |-generators/                  生成器目录
        |  |_app/					   默认生成器目录
        |    |_index.js                默认生成器实现
        |_package.json                 模块包配置文件
        ```

        含有多个sub generator

        ```js
        |-generators/                  生成器目录
        |  |_app/					   默认生成器目录
        |    |_index.js                默认生成器实现
        |  |_componenet/			   其他生成器目录
           |_index.js				   其他生成器实现
        |_package.json                 模块包配置文件
        ```

        

        - package.json

      - 命名必须是generator-<name>的形式命名 比如 generator-sample
      
    - 过程操作
    
      - 创建`package.json`   yarn init
    
      - 下载generator的基类  yeoman-generator
    
        ```js
        //generator-demo 文件夹下目录
        generators
        node_modules
        package.json
        yarn.lock
        //generators/app/index.js
        const Generator = require('yeoman-generator');
        module.exports = class extends Generator{
            initianlizing(){
                //获取当前项目状态，获取基本配置参数等
            }
            prompting(){
                //向用户展示交互式问题收集关键参数
            }
            configuring(){
                //保存配置相关信息且生成配置文件（名称多为'.'开头的配置文件,例如.editorconfig）
            }
            default(){
                //未匹配任何生命周期方法的非私有方法均在此环节*自动*执行
            }
            writing(){
                //依据模板进行新项目结构的写操作
            }
            conflicts(){
                //处理冲突(内部调用，一般不用处理）
            }
            install(){
                //使用指定的包管理工具进行依赖安装(支持npm,bower,yarn)
            }
            end(){
                //结束动作，例如清屏，输出结束信息，say GoodBye等等
            }
        }
        ```
    
        
    
      - 创建好之后，使用yarn/npm link 链接全局环境
    
      - yo <name> 就会执行

  

  

  

  
  
  
  
  


  - plop

    - 创建项目中特定类型的文件的工具

    - 案例 每创建一个文件夹 对应自动生成3个文件 `js css html`

      - 下载`plop yarn add plop --dev`

      - 在当前项目下创建一个`plopfile.js`的文件

        ```js
        //plopfile.js
        // plop入口文件 需要导出一个函数
        module.exports=function(plop){
            plop.setGenerator("component",{  //设定一个生成器
                description:"create a component", //对这个生成器的描述
                prompts:[  //提示
                    {
                        type:"input",  //交互类型
                        name:"name", //参数名称
                        message:"component name", //交互提示
                        default:"myComponent"//默认值
                    }
                ],
                actions:[
                    {
                        type:"add",
                        path:"src/components/{{name}}/{{name}}.js", //{{}}双大括号内设置动态参数
                        templateFile:"templates/template.hbs"//模板所在地址使用hbs文件
                    },
                  {
                        type:"add",
                        path:"src/components/{{name}}/{{name}}.css",
                        templateFile:"templates/template.hbs"
                    },
                    {
                        type:"add",
                        path:"src/components/{{name}}/{{name}}.html",
                        templateFile:"templates/template.hbs"
                    }
                ]
            })
        }
        
        ```

        完成之后 指令  `yarn plop component ` component是生成器，就可以生成对应得生成器

- 脚手架工作原理

  - 初始化package.json文件

  - 在文件中添加 “bin”字段

    ```js
    {
      "name": "sample",
      "version": "1.0.0",
      "main": "index.js",
      "bin":"cli.js",   //脚手架入口文件
      "license": "MIT"
    }
    
    ```

  - cli.js

    - 文件头必须写上 `\#!/usr/bin/env node`
    - yarn link 后 使用脚手架 报错 yarn global bin看下全局安装目录

  - 脚手架的工作过程

    - 通过命令行交互询问用户问题
      - inquirer 模块

    - 根据用户回答的结果生成文件

  - 

### 

各位小伙伴，鉴于很多小伙伴出现yarn link 后指令报错的问题，简单描述下原因和解决办法

yarn link 该命令是在你想链接的包文件夹中运行，
如果yarn link后，使用指令还报错的小伙伴
我们可以通过yarn global bin 找到它对应的目录，在终端通过 set PATH 看是否添加到环境变量重。 没有添加的话，我们需要把这个目录添加到环境变中，重新启动终端，再链接就解决了大部分同学指令不能使用的问题
npm的安装目录只有一个，所以npm link不会出现这种情况。







- 问题总结

  - 配置好脚手架 yarn link 后 启动脚手架 报不是内部指令

    > 当时搜到的是这是yarn的一个bug，目前我在1.19这个bug仍然是浮现的，yarn的link把包同步到~/config/yarn/link中，但没有同步到/usr/local/bin中，所以这在yarn global list中同样看不见link的包



**工程化**

1. 前端工程化