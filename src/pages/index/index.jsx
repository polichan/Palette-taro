import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton } from "taro-ui";
import SchoolLogo from "./../../assets/imgs/school_logo.png";

import { add, minus, asyncAdd } from "../../actions/counter";

import "./index.scss";

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
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

  handleLoginClick() {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }

  handleAboutClick()
  {

  }

  render() {
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
            </View>
          </View>
          <View className='at-row at-row-about'>
            <View className='at-col at-col-12'>
              <Text className='about' onClick={this.handleAboutClick.bind(this)}>
                关于本实验
              </Text>
            </View>
            <View className='at-col at-col-12'>
              <Text className='license' onClick={this.handleAboutClick.bind(this)}>
                用户协议
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}