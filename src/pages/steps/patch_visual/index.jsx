import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import StepPage from '@/components/StepPage'
import { getSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

export default class PatchVisual extends Component {

  state = {
    patchVisualImg: getSrc(CDN_IMAGE.PATCH_VISUAL, false)
  }

  handleNextClick(callback) {
    callback(true)
  }

  handleImageLoad() {
    const gifurl = this.state.patchVisualImg;
    const nowTime = + new Date();
    setTimeout(() => {
      this.setState({
        patchVisualImg: gifurl + '?' + nowTime
      })
    }, 9000)
  }

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='patch-visual-container flex flex-center flex-direction-column'>
          <Image src={this.state.patchVisualImg} mode='scaleToFill' className='visual-img' onLoad={this.handleImageLoad.bind(this)}></Image>
        </View>
      </StepPage>
    );
  }
}