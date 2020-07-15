import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import NavBar from "@/components/NavBar";
import { connect } from "@tarojs/redux";
import FormBox from "@/components/FormBox";
import "./index.scss";

@connect(({ user, loading }) => ({
  user,
  loading
}))
export default class Index extends Component {
  state = {
    codeNumber: null,
    password: null
  };

  componentDidMount() {}

  config = {
    navigationBarTitleText: "登录"
  };

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

  /**
   * 登录
   */
  handleLoginClick() {
    this.canLogin((canLogin, params) => {
      if (canLogin) {
        this.props.dispatch({
          type: "user/login",
          payload: { data: params },
          onLoginSuccessfully: () => {
            Taro.redirectTo({
              url: "/pages/index/index"
            });
          }
        });
      } else {
        Taro.showToast({
          icon: "none",
          title: params.message
        });
      }
    });
  }

  /**
   * 验证字段
   */
  canLogin(callback) {
    if (this.state.codeNumber == null || this.state.codeNumber == "") {
      callback(false, { message: "学号不能为空" });
      return;
    } else if (this.state.password == null || this.state.password == "") {
      callback(false, { message: "密码不能为空" });
      return;
    }
    callback(true, {
      code_number: this.state.codeNumber,
      password: this.state.password
    });
  }

  render() {
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
                      maxLength='10'
                      placeholder="请输入学号"
                      value={this.state.codeNumber}
                    ></Input>
                  </FormBox>
                  <FormBox label='密码'>
                    <Input
                      onInput={this.handlePasswordChange.bind(this)}
                      className='input_name'
                      maxLength='16'
                      type='password'
                      placeholder="请输入密码"
                      value={this.state.password}
                    ></Input>
                  </FormBox>
                  <AtButton
                    openType='getUserInfo'
                    loading={isLoginLoading}
                    className='authorize-btn c-btn-linergradient-blue'
                    onGetUserInfo={this.handleLoginClick.bind(this)}
                    onClick={() => {
                      this.handleLoginClick();
                    }}
                  >
                    立即登陆
                  </AtButton>
                </View>
              </View>
            </View>
            <Text className='authorize-tips'>登录即代表同意用户使用协议</Text>
          </View>
        </View>
      </View>
    );
  }
}
