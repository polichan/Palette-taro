import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import Article from "@/components/Article";
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

export default class Binarization extends Component {
  state = {
    data: {
      sections: [
        '什么是二值化？如何转化为十进制图片？',
        '我们对第二层的每个输出图片都进行二值化处理，得到的结果中只包含一和零(大于等于零的数取1,小于零的数取0)，于是就得到了二值化的图。',
        '然后将二值化的图片乘以不同的权重(例如: 2的七次方等于128，2的六次方64。32, 16, 8，4, 2, 1)。将每张图片对应位置的像素值相加，这样得到的图片每个像素都由十进制的值来表示。',
        '二进制转十进制的可视化'
      ]
    },
    imgs: {
      binaryVisualImg: getLocalCacheImageSrc(CDN_IMAGE.BINARY_VISUAL)
    }
  }

  handleNextClick(callback) {
    callback(true)
  }

  render() {
    const { data, imgs } = this.state
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <Article sections={data.sections}></Article>
        <View className='binary-imgs-container flex flex-center flex-direction-column'>
          <Image src={imgs.binaryVisualImg} className='binary-img' mode='aspectFill'></Image>
        </View>
      </StepPage>
    );
  }
}
