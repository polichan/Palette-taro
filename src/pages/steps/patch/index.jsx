import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import StepPage from '@/components/StepPage'
import { getLocalCacheImageSrc } from "@/utils/utils";
import Article from "@/components/Article";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

export default class Patch extends Component {

  state = {
    patchVisualImg: getLocalCacheImageSrc(CDN_IMAGE.PATCH_VISUAL),
    data: {
      title: "Patch作用",
      sections: [
        '在人脸识别过程中，我们要做的第一步就是将输入的原始图片分成很多小方块（patch），其大小可以我们自己定义，但是有固定的比例，然后进行接下来的训练。注：下图是取patch的动态过程，patch的大小为31×31。'
      ]
    }
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
    const { data } = this.state
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
          <Article sections={data.sections}></Article>
        <View className='patch-visual-container flex flex-center flex-direction-column'>
          <Image src={this.state.patchVisualImg} mode='scaleToFill' className='visual-img' onLoad={this.handleImageLoad.bind(this)}></Image>
        </View>
      </StepPage>
    );
  }
}