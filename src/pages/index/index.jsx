import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import NavBar from "@/components/NavBar";
import { connect } from "@tarojs/redux";
import { AtButton } from "taro-ui";
import * as CONSTANTS from "@/constants/index";
import SchoolLogo from "../../assets/imgs/school_logo.png";
import "./index.scss";

@connect(({ login }) => ({
  login
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  handleLoginClick() {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }

  handleBegin() {
    Taro.navigateTo({
      url: "/pages/steps/workflow/index"
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

  render() {
    const { isLogin } = this.props.login;
    return (
      <View className='index'>
        <NavBar background='#fff' />
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
          <View className='about-box'>
            <View className='at-col'>
              <Text
                className='user-license bottom-text'
                onClick={this.handleBottomTextClick.bind(
                  this,
                  CONSTANTS.LICENSE_TYPE.USER_LICENSE
                )}
              >
                {CONSTANTS.LICENSE_TYPE.USER_LICENSE}
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
                  CONSTANTS.LICENSE_TYPE.OPEN_SOURCE_LICENSE
                )}
              >
                {CONSTANTS.LICENSE_TYPE.OPEN_SOURCE_LICENSE}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
