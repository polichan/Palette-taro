import Taro, { Component } from "@tarojs/taro";
import { View, Text} from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ login, loading }) => ({
  login,
  loading
}))
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      codeNumber: null,
      password: null
    };
  }
  state = {};

  componentDidMount() {}

  config = {
    navigationBarTitleText: "登录"
  };

  handlePasswordChange(value) {
    this.setState({
      password: value
    });
  }

  handleCodeNumberChange(value) {
    this.setState({
      codeNumber: value
    });
  }

  /**
   * 登录
   */
  handleLoginClick() {
    this.canLogin((canLogin, params) => {
      if (canLogin) {
        this.props.dispatch({
          type: "login/login",
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
                <Text>众多功能，尽在登陆后</Text>
                <AtButton openType='getUserInfo' loading={isLoginLoading} className='authorize-btn authorize-btn c-btn-linergradient-blue' onGetUserInfo={this.handleLoginClick.bind(this)}>
                  微信快速登陆
                </AtButton>
              </View>
            </View>
          </View>
        <Text className='authorize-tips'>登录注册即代表同意用户使用协议</Text>
        </View>
      </View>
        <AtForm>
          <AtInput
            required
            name='codeNumber'
            title='学号'
            type='text'
            placeholder='请输入您的学号'
            value={this.state.codeNumber}
            onChange={this.handleCodeNumberChange.bind(this)}
          />
          <AtInput
            required
            name='password'
            title='密码'
            type='password'
            placeholder='请输入您的密码'
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
          />
        </AtForm>
        <AtButton
          type='primary'
          className='login-btn'
          size='normal'
          openType='getUserInfo'
          loading={isLoginLoading}
          onClick={() => {
            this.handleLoginClick();
          }}
        >
          登录
        </AtButton>
      </View>
    );
  }
}
