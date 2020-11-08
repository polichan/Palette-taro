import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import StepPage from "@/components/StepPage";
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import Article from "@/components/Article";
import "./index.scss";


export default class Index extends Component {
  state = {
    convolutionValue: null,
    helpFloatLayoutOpened: false,
    imgs: {
      ConvolutionImg: getLocalCacheImageSrc(CDN_IMAGE.CONVOLUTION_VISUAL)
    },
    data: {
      sections: [
        '对图像做卷积操作其实就是利用卷积核(即滤波器)在图像上滑动，将图像点上的像素灰度值与对应的卷积核上的数值相乘，然后将所有相乘后的值相加作为卷积核中间像素对应的图像上像素的灰度值，并最终滑动完所有图像的过程。(为了便于显示，这里展示的是7x7大小的filter对图片进行卷积计算的过程)'
      ]
    }
  }
  handleConvolutionChange(value) {
    this.setState({
      convolutionValue: value
    });
  }

  handleNextClick(callback) {
    callback(true)
  }

  handleImageLoad() {
    const gifurl = this.state.imgs.ConvolutionImg;
    const nowTime = + new Date();
    setTimeout(() => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        patchVisualImg: gifurl + '?' + nowTime
      })
    }, 9000)
  }

  render() {
    const { helpFloatLayoutOpened, data } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel={true}>
        <Article sections={data.sections}></Article>
        <Image src={this.state.imgs.ConvolutionImg} lazyLoad className='convolution-img'></Image>
      </StepPage>
    );
  }
}
