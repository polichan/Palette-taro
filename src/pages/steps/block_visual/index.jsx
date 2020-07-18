import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import {getSrc} from "@/utils/utils";
import {CDN_IMAGE} from "../../../constants/index";
import "./index.scss";

export default class BlockVisual extends Component {

  state = {
    imgs:{
      blockVisualImg: getSrc(CDN_IMAGE.BLOCK_VISUAL, false)
    }
  }
  handleNextClick(callback) {
    callback(true);
  }

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='block-visual-container flex flex-center flex-direction-column'>
          <Image src={this.state.imgs.blockVisualImg} className='block-img'></Image>
          <Text className='title'>为了方便显示，这里展示的是 32x32 大小的 block</Text>
        </View>
      </StepPage>
    );
  }
}
