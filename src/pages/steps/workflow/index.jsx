import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import StepPage from '@/components/StepPage'
import WorkFlowPng from '../../../assets/imgs/workflow.png'
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
        <StepPage>
          <Image src={WorkFlowPng} mode='aspectFit' className='work-flow-img'></Image>
        </StepPage>
      </View>
    );
  }
}
