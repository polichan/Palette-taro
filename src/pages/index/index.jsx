import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import NavBar from "@/components/NavBar";
import { connect } from "@tarojs/redux";
import { AtButton } from "taro-ui";
import * as Utils from "@/utils/utils";
import * as CONSTANTS from "@/constants/index";
import SchoolLogo from "../../assets/imgs/school_logo.png";
import "./index.scss";

@connect(({ user }) => ({
  user
}))
export default class Index extends Component {
  componentWillMount() {
    Utils.restoreLoginStatus();
  }

  config = {
    navigationBarTitleText: "首页"
  };

  handleLoginClick() {
    Utils.navigateTo("/pages/login/index");
  }

  handleBegin() {
    this.beginWorkflow();
  }

  beginWorkflow() {
    Taro.showLoading({
      title: '检测资源文件中...'
    })
    this.checkCacheFiles()
      .then(() => {
        Taro.hideLoading()
        Utils.navigateTo("/pages/steps/workflow/index");
      })
      .catch(() => {
        Taro.hideLoading()
        Taro.showModal({
          title: "提示",
          content: "首次运行需要加载资源包，是否继续？",
          success: res => {
            if (res.confirm) {
              Utils.navigateTo("/pages/cache/index");
            }
          }
        });
      });
  }

  checkCacheFiles() {
    return new Promise((resolve, reject) => {
      const cacheObject = CONSTANTS.CDN_IMAGE;
      const fileManager = Taro.getFileSystemManager();
      let hasCacheFiles = true;
      for (const key in cacheObject) {
        if (cacheObject.hasOwnProperty(key)) {
          const element = cacheObject[key];
          if (!fileManager.readFileSync(Utils.getLocalCacheImageSrc(element))) {
            hasCacheFiles = false;
          }
        }
      }
      hasCacheFiles ? resolve() : reject();
    });
  }

  /**
   * 底部文字跳转
   * @param {*} type
   */
  handleBottomTextClick(type) {
    Taro.navigateTo({
      url:
        type == "about"
          ? "/pages/about/index"
          : `/pages/license/index?type=${type}`
    });
  }

  handleLongPress() {
    if (process.env.NODE_ENV == 'development') {
      Taro.clearStorageSync();
      Taro.showToast({
        icon: "none",
        title: "DEBUG模式已启动",
        duration: 3000,
        success: () => {
          setTimeout(() => {
            Taro.reLaunch({
              url: "/pages/index/index"
            });
          }, 3000);
        }
      });
    }
  }

  renderBottomText() {
    return (
      <View className='about-box'>
        <View className='at-col'>
          <Text
            className='user-license bottom-text'
            onClick={this.handleBottomTextClick.bind(
              this,
              '用户使用协议'
            )}
          >
            用户使用协议
          </Text>
        </View>
        <View className='at-col'>
          <Text
            className='about bottom-text'
            onClick={this.handleBottomTextClick.bind(this, "about")}
          >
            关于本实验
              </Text>
        </View>
        <View className='at-col'>
          <Text
            className='open-source-license bottom-text'
            onClick={this.handleBottomTextClick.bind(
              this,
              '开源许可协议'
            )}
          >
            开源许可协议
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { isLogin } = this.props.user;
    return (
      <View className='index'>
        <NavBar background='#fff' />
        <View className='container'>
          <View className='at-row'>
            <View
              className='at-col at-col-24 at-col--wrap'
              onLongPress={this.handleLongPress.bind(this)}
            >
              <Image src={SchoolLogo} className='logo'></Image>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-24 at-col--wrap'>
              <Text className='title'>人脸识别虚拟仿真实验</Text>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-24 at-col--wrap'>
              <Text className='desc'>
                欢迎来到上海电机学院人脸识别虚拟仿真实验！本实验主要以多层卷积神经网络进行人脸识别，人脸识别的每一步都进行可视化的展现，并且可以自定义一些参数，让您有更深刻直白的人工智能学习体验。快来动手实现它吧！\n\n 访客登录，用户名：fangke ，密码：fangke
              </Text>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-24 at-col--wrap'>
              {isLogin ? (
                <AtButton
                  type='primary'
                  className='login-btn c-btn-linergradient-blue'
                  size='normal'
                  onClick={() => {
                    this.handleBegin();
                  }}
                >
                  进行实验
                </AtButton>
              ) : (
                  <AtButton
                    type='primary'
                    className='login-btn c-btn-linergradient-blue'
                    size='normal'
                    openType='getUserInfo'
                    onClick={() => {
                      this.handleLoginClick();
                    }}
                  >
                    登录
                  </AtButton>
                )}
            </View>
          </View>
          {
            this.renderBottomText()
          }
        </View>
      </View>
    );
  }
}
