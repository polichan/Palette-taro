import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import Article from "@/components/Article";
import "./index.scss";

export default class Histogram extends Component {
  state = {
    imgs: {
      histogramVisualImg: getLocalCacheImageSrc(CDN_IMAGE.HISTOGRAM_VISUAL)
    },
    data: {
      sections: [
        '将每个分块后的图片对应的像素值和像素点进行绘制成直方图。将每个块的直方图连接起来，构成一个长长的向量，人脸图像经过 PCANet 后变成了这个一维向量',
        '即由这个一维向量表示这幅人脸图像，这个一维向量就是 PCANet 提取到的图片的特征。'
      ]
    }
  };

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    const { data } = this.state
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel>
        <Article sections={data.sections}></Article>
        <View className='histogram-container flex flex-center flex-direction-column'>
          <Image src={this.state.imgs.histogramVisualImg} className='histogram-img'></Image>
        </View>
      </StepPage>
    );
  }
}
