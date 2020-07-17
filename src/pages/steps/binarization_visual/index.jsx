import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import BinaryImg from "../../../assets/imgs/binary_visual.jpg";
import "./index.scss";

export default class BinarizationVisual extends Component {
  handleNextClick(callback) {
    callback(true);
  }
  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='binary_visual-container flex flex-center flex-direction-column'>
          <Text className='title'>二进制转十进制的可视化（第一层）</Text>
          <Image src={BinaryImg} className='binary-img'></Image>
        </View>
      </StepPage>
    );
  }
}
