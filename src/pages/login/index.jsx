import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import NavBar from "@/components/NavBar";
import { connect } from "@tarojs/redux";
import FormBox from "@/components/FormBox";
import * as CONSTANTS from "@/constants/index";
import "./index.scss";

@connect(({ user, loading }) => ({
  user,
  loading
}))
export default class Index extends Component {
  state = {
    captchaObj: {},
    codeNumber: null,
    password: null,
    captcha: null,
  };

  componentWillMount() {
    this.getCaptchaCode();
  }

  config = {
    navigationBarTitleText: "登录"
  };

  input

  handlePasswordChange(e) {
    this.setState({
      password: e.detail.value
    });
  }

  handleCodeNumberChange(e) {
    this.setState({
      codeNumber: e.detail.value
    });
  }

  handleCaptchaChange(e) {
    this.setState({
      captcha: e.detail.value
    });
  }

  handleCaptchaClick() {
    this.getCaptchaCode();
  }

  getCaptchaCode() {
    this.props
      .dispatch({
        type: "user/getCaptcha"
      })
      .then(res => {
        if (res) {
          this.setState({
            captchaObj: res.data
          });
        } else {
          Taro.showToast({
            icon: "none",
            title: "验证码获取失败"
          });
        }
      });
  }

  handleCaptchaError() {
    Taro.showToast({
      icon: "none",
      title: "验证码加载失败"
    });
  }

  /**
   * 登录
   */
  handleLoginClick() {
    this.validateFields((canLogin, params) => {
      if (canLogin) {
        this.props
          .dispatch({
            type: "user/login",
            payload: { data: params }
          })
          .then(res => {
            if (res.success) {
              Taro.showToast({
                icon: "none",
                title: "登录成功",
                duration: 2000,
                complete: () => {
                  setTimeout(() => {
                    Taro.redirectTo({
                      url: "/pages/index/index"
                    });
                  }, 2000);
                }
              });
            } else {
              Taro.showToast({
                icon: "none",
                title: res.msg
              });
              this.getCaptchaCode();
            }
          });
      } else {
        Taro.showToast({
          icon: "none",
          title: params.message,
          duration: 2000
        });
      }
    });
  }

  /**
   * 验证字段
   */
  validateFields(callback) {
    if (this.state.codeNumber == null || this.state.codeNumber == "") {
      callback(false, { message: "学号不能为空" });
      return;
    } else if (this.state.password == null || this.state.password == "") {
      callback(false, { message: "密码不能为空" });
      return;
    } else if (this.state.captcha == null || this.state.captcha == "") {
      callback(false, { message: "验证码不能为空" });
      return;
    }
    callback(true, {
      username: this.state.codeNumber,
      password: this.state.password,
      captcha: this.state.captcha,
      captchaId: this.state.captchaObj.captchaId
    });
  }

  handleUserLicenseTextClick() {
    Taro.navigateTo({
      url: `/pages/license/index?type=${CONSTANTS.LICENSE_TYPE.USER_LICENSE}`
    });
  }

  render() {
    const { captchaObj } = this.state;
    const isLoginLoading = this.props.loading.effects["login/login"];
    return (
      <View className='container'>
        <NavBar background='rgba(255,255,255,0.0)' back />
        <View className='authorization-page'>
          <View className='authorization-wrapper flex flex-direction-column flex-alignItems-center'>
            <View className='authorization-header flex flex-direcation-column flex-center'>
              <View className='authorization-header-wave1'></View>
              <View className='authorization-header-wave2'></View>
              <View className='authorization-header-wave3'></View>
            </View>
            <View className='authorization-main'>
              <View className='flex flex-direction-column flex-alignItems-center'>
                <View className='main-content flex flex-direction-column flex-alignItems-center'>
                  <FormBox label='学号'>
                    <Input
                      onInput={this.handleCodeNumberChange.bind(this)}
                      className='input_name'
                      placeholder='请输入学号'
                      value={this.state.codeNumber}
                    ></Input>
                  </FormBox>
                  <FormBox label='密码'>
                    <Input
                      onInput={this.handlePasswordChange.bind(this)}
                      className='input_name'
                      maxLength='16'
                      type='password'
                      placeholder='请输入密码'
                      value={this.state.password}
                    ></Input>
                  </FormBox>
                  <FormBox label='验证码'>
                    <Input
                      onInput={this.handleCaptchaChange.bind(this)}
                      className='input_name input_captcha'
                      maxLength='16'
                      placeholder='请输入验证码'
                      value={this.state.captcha}
                      adjustPosition
                    ></Input>
                    <Image
                      mode='aspectFit'
                      src={captchaObj.picPath}
                      className='captcha-img'
                      onClick={this.handleCaptchaClick.bind(this)}
                      onError={this.handleCaptchaError.bind(this)}
                    />
                  </FormBox>
                  <AtButton
                    loading={isLoginLoading}
                    className='authorize-btn c-btn-linergradient-blue'
                    onClick={() => {
                      this.handleLoginClick();
                    }}
                  >
                    立即登陆
                  </AtButton>
                </View>
              </View>
            </View>
            <Text
              className='authorize-tips'
              onClick={this.handleUserLicenseTextClick.bind(this)}
            >
              登录即代表您已同意
              <Text className='user-license'>《用户使用协议》</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
