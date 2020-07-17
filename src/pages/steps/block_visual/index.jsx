import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import BlockVisualImg from "../../../assets/imgs/block_visual.jpg";
import "./index.scss";

export default class BlockVisual extends Component {
  handleNextClick(callback) {
    callback(true);
  }

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='block-visual-container flex flex-center flex-direction-column'>
          <Text className='title'>Block的可视化（第一层）</Text>
          <Image src={BlockVisualImg} className='block-img'></Image>
        </View>
      </StepPage>
    );
  }
}
