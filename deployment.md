### 部署教程

#### 源代码地址：https://github.com/polichan/Palette-taro

注：若需要查看源代码文件，可直接在源代码地址进行在线阅读或下载源代码进行查看。

* 访问源代码地址，进入 Release 或直接点击访问[此处](https://github.com/polichan/Palette-taro/releases/tag/1.0）下载编译后的最新版本小程序代码压缩文件

*  解压该压缩文件

* 打开微信开发者工具

* 将解压后的文件导入至微信开发者工具

* 运行查看


#### 关于配置文件：

![img](https://github.com/polichan/Palette-taro/blob/master/screenshots/config.png)

配置文件位于：项目根目录/src/config/config.js；配置内容如下：

![img](https://github.com/polichan/Palette-taro/blob/master/screenshots/config_detail.png)

其中 **BASE_API** 为小程序请求接口地址，会根据当前的环境进行切换请求地址。

其中 **MD_RENDER_API** 为小程序渲染 Latex Markdown 文本的接口服务，在本小程序中用于公式渲染。

#### 接口部署

**注**：接口已部署在腾讯云服务器，域名：api.fengkuangqie.cn
