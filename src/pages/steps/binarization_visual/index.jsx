import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import {getLocalCacheImageSrc} from "@/utils/utils";
import {CDN_IMAGE} from "../../../constants/index";
import "./index.scss";

export default class BinarizationVisual extends Component {
  state = {
    imgs:{
      binaryVisualImg: getLocalCacheImageSrc(CDN_IMAGE.BINARY_VISUAL)
    }
  }
  handleNextClick(callback) {
    callback(true);
  }
  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='binary_visual-container flex flex-center flex-direction-column'>
          <Image src={this.state.imgs.binaryVisualImg} className='binary-img' mode='aspectFill'></Image>
          <Text className='title'>二值化图片与二值化堆叠后图片</Text>
        </View>
      </StepPage>
    );
  }
}
