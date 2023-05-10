## 前期环境准备

1、下载安装 `NodeJs`
2、打开 `vscode` 在终端执行 `npm install typescript -g`
3、新建一个项目 `ts` 并打开两个终端窗口（【1】，【2】）
4、在【1】里执行 `tsc --init` 初始化配置
5、新建文件 `index.ts`

```
let str: string = '字符串'
console.log(str)

```

输入以上代码 然后【1】执行 `tsc -w` （此命令会实时监听变化并编译） 就会看到生成了 `index.js` 文件

接着在【2】执行 `node index.js` 就能看到打印了 `字符串`

6、执行 `npm i ts-node -g` 安装完成后执行 `ts-node index.ts` 可以自动编译并执行代码

ps: 如果下载太慢 安装一下 `npm i xmzs -g` 完成后用 `mmp use` 切换镜像源

## 了解类型顺序

*  any 任意类型 unknown 不知道的类型
*  Object
*  Number String Boolean
*  number string boolean
*  1      '字'    false
*  never

从上到下 向下兼容 比如 any、unknown 包含下面所有类型

## 特殊类型用法

### unknown

* 只能赋值给自身或者是any
* 没有办法读任何属性
* 方法也不可调用
* 比 any 更安全

### interface 接口

* 重名 重合
* 任意 key
* ？可选属性
* readonly 只读属性
* extends 可继承多个
* 可定义函数类型
* 不能多属性 也不能少属性

