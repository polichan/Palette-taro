import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      stuNumber: "",
      password: ""
    };
  }
  state = {};

  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps, nextContext) {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  componentDidNotFound() {}

  config = {
    navigationBarTitleText: "登录"
  };

  handleChange(value) {
    this.setState({
      value
    });
  }
  onSubmit(event) {
    console.log(this.state.stuNumber);
  }
  onReset(event) {
    this.setState({
      stuNumber: ""
    });
  }
  render() {
    return (
      <View className='container'>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='stuNumber'
            title='学号'
            type='text'
            placeholder='请输入您的学号'
            value={this.state.stuNumber}
            onChange={this.handleChange.bind(this, "stuNumber")}
          />

          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='请输入您的密码'
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
        </AtForm>
        <AtButton
          type='primary'
          className='login-btn'
          size='normal'
          openType='getUserInfo'
          formType='submit'
        >
          登录
        </AtButton>
      </View>
    );
  }
}
