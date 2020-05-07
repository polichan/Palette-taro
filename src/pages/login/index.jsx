import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      stuNumber: null,
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

  handleStuNumberChange(value) {
    this.setState({
      stuNumber: value
    });
  }

  /**
   * 登录
   */
  handleLoginClick() {
    this.validateFields((err, params) => {
      if (!err) {
        // todo  Login API
      } else {
        Taro.showToast({
          icon: "none",
          title: err.message
        });
      }
    });
  }

  /**
   * 验证字段
   */
  validateFields(callback) {
    if (this.state.stuNumber === null) {
      callback({ message: "学号不能为空" });
    } else if (this.state.password === null) {
      callback({ message: "密码不能为空" });
    }
    callback(false, this.state);
  }

  render() {
    return (
      <View className='container'>
        <AtForm>
          <AtInput
            name='stuNumber'
            title='学号'
            type='text'
            placeholder='请输入您的学号'
            value={this.state.stuNumber}
            onChange={this.handleStuNumberChange.bind(this)}
          />

          <AtInput
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
