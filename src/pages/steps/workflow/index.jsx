import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  config = {
    navigationBarTitleText: "实验流程"
  };

  handleNextStep() {
    Taro.navigateTo({
      url: "/pages/steps/face/index"
    });
  }

  render() {
    return (
      <View className='workflow-page'>
        <AtButton onClick={this.handleNextStep} type='primary'>下一步</AtButton>
      </View>
    );
  }
}
