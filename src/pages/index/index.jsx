import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton } from "taro-ui";
import SchoolLogo from "./../../assets/imgs/school_logo.png";
import "./index.scss";

@connect(({ login }) => ({
  login
}))
export default class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页"
  };

  /**
   * 登录事件
   */
  handleLoginClick() {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }

  handleBegin()
  {
    Taro.navigateTo({
      url: '/pages/steps'
    })
  }

  /**
   * 底部文字跳转
   * @param {*} type
   */
  handleBottomTextClick(type) {
    let page = null;
    switch (type) {
      case "about":
        page = "/pages/about/index";
        break;
      case "user-license":
        page = "/pages/license/index?type=user";
        break;
      case "open-source":
        page = "/pages/license/index?type=opensource";
    }
    Taro.navigateTo({
      url: page
    });
  }

  render() {
    const { isLogin } = this.props.login;
    return (
      <View className='index'>
        <View className='container'>
          <View className='at-row'>
            <View className='at-col at-col-24 at-col--wrap'>
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
                欢迎来到上海电机学院人脸识别虚拟仿真实验！本实验主要以多层卷积神经网络进行人脸识别，人脸识别的每一步都进行可视化的展现，并且可以自定义一些参数，让您有更深刻直白的人工智能学习体验。快来动手实现它吧！
              </Text>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-24 at-col--wrap'>
              {isLogin ? (
                <AtButton
                  type='primary'
                  className='login-btn'
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
                  className='login-btn'
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
          <View className='at-row at-row-about'>
            <View className='at-col at-col-2'>
              <Text
                className='user-license bottom-text'
                onClick={this.handleBottomTextClick.bind(this, "user-license")}
              >
                用户协议
              </Text>
            </View>
            <View className='at-col at-col-2'>
              <Text
                className='about bottom-text'
                onClick={this.handleBottomTextClick.bind(this, "about")}
              >
                关于本实验
              </Text>
            </View>
            <View className='at-col at-col-2'>
              <Text
                className='open-source-license bottom-text'
                onClick={this.handleBottomTextClick.bind(this, "open-source")}
              >
                开源协议
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
