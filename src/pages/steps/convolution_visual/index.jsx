import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import StepPage from "@/components/StepPage";
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import faceImage from "../../../assets/imgs/face.jpg"
import "./index.scss";

export default class ConvolutionVisual extends Component {

    state = {
        imgs: {
            convolutionVisualFirst: getLocalCacheImageSrc(CDN_IMAGE.CONVOLUTION_VISUAL_FIRST),
            convolutionVisualSecond: getLocalCacheImageSrc(CDN_IMAGE.CONVOLUTION_VISUAL_SECOND),
        }
    }

    handleNextClick(callback) {
        callback(true)
    }

    renderImage(img, secondPic = false, center = false) {
        return <View className={`${center ? 'visual-img-container flex flex-direction-column flex-center' : 'visual-img-container flex flex-direction-column'}`}>
            <Image src={img} className={`${secondPic ? 'visual-img second-visual-img' : 'visual-img'}`}></Image>
        </View>
    }

    render() {
        return (
            <StepPage onNext={this.handleNextClick.bind(this)}>
                <View className='visual-container'>
                    <View className='flex flex-direction-column'>
                        <View className='header flex  flex-direction-column'>
                            <Text className='header-text'>卷积结果第一层可视化</Text>
                            <Text className='header-text'>卷积核8个</Text>
                        </View>
                        {
                            this.renderImage(faceImage, false, true)
                        }
                        <View className='bottom flex flex-direction-column'>
                            <Text className='bottom-text'>
                                原图
                            </Text>
                        </View>
                        {
                            this.renderImage(this.state.imgs.convolutionVisualSecond, true, true)
                        }
                        <View className='bottom flex flex-direction-column'>
                            <Text className='bottom-text'>
                                卷积结果第一层
                            </Text>
                        </View>
                    </View>
                </View>
            </StepPage>
        );
    }
}