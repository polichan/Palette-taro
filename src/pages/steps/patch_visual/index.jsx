import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import StepPage from '@/components/StepPage'
import PatchVisualImg from "../../../assets/imgs/patch_visual.jpg";
import "./index.scss";

export default class PatchVisual extends Component {

  state = {}

  handleNextClick(callback) {
    callback(true)
  }
  render() {
    return (
        <StepPage onNext={this.handleNextClick.bind(this)}>
          <View className='patch-visual-container flex flex-center flex-direction-column'>
            <Image src={PatchVisualImg} mode='scaleToFill' className='visual-img'></Image>
          </View>
        </StepPage>
    );
  }
}