import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import SuccessImg from "../../assets/imgs/success.png";
import "./index.scss";

export default class Thanks extends Component {
  config = {
    navigationBarTitleText: "感谢测试"
  };

  handleNextClick(callback) {
    callback(false);
  }

  render() {
    return (
      <StepPage
        onNext={this.handleNextClick.bind(this)}
        showPanel={false}
        showProgressBar={false}
      >
        <View className='success-container flex flex-center flex-direction-column'>
          <Image src={SuccessImg} className='thanks-img'></Image>
          <Text className='thanks-text'>实验结束，感谢测试</Text>
        </View>
      </StepPage>
    );
  }
}
