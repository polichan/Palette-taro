## 人脸识别虚拟仿真实验

### 项目介绍

人脸识别虚拟仿真实验平台是以多层卷积神经网络进行人脸识别，将人脸识别的每一步进行可视化，并且可以自定义一些参数，让同学们可以更深刻直白的理解人工智能。操作主要依托于微信小程序，用户可以在手机端进行操作，更加方便快捷。采用微信小程序部署，用户可以在手机端通过微信小程序进入虚拟仿真平台。

在小程序端主要介绍了该平台的基本情况，为用户提供了登陆界面，以供用户体验。在小程序端主要介绍了数据集、设计流程、可视化的过程等，用户可以通过在小程序端调节参数来实现对于不同条件下的仿真。同时，也配备了相应的题目来对学生进行测试，使学生可以更好的了解人工智能。

在服务器端选用腾讯云，通过远程部署，将用户的登录信息存储在云服务器，在小程序端进行调用。通过云服务器，可以更好的对用户信息进行存储和调用，从而更好的服务于前端小程序。

### 效果截图
                                                                                             
截图 1                      |  截图 2
:-------------------------:|:-------------------------:
![](https://github.com/polichan/Palette-taro/blob/master/screenshots/screenshot_4.jpg)  |  ![](https://github.com/polichan/Palette-taro/blob/master/screenshots/screenshot_3.jpg)

对人脸识别中一些难以理解的步骤，例如patch的提取和卷积的过程等。我们都以动画的形式进行更为直观的展示，让学生能有更好的学习体验。

截图 3                      |  截图 4
:-------------------------:|:-------------------------:
![](https://github.com/polichan/Palette-taro/blob/master/screenshots/screenshot_2.jpg)  |  ![](https://github.com/polichan/Palette-taro/blob/master/screenshots/screenshot_1.jpg)

### 小程序线上二维码

![qrcode](https://github.com/polichan/Palette-taro/blob/master/screenshots/qrcode.png)

### 部署
[部署详情](https://github.com/polichan/Palette-taro/blob/master/deployment.md)
### License
GNU GENERAL PUBLIC LICENSE Version 2, June 1991
