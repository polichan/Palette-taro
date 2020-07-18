import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import StepPage from "@/components/StepPage";
import { getSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

export default class ConvolutionVisual extends Component {

    config = {
        navigationBarTitleText: ''
    }

    state = {
        imgs: {
            convolutionVisualFirst: getSrc(CDN_IMAGE.CONVOLUTION_VISUAL_FIRST, false),
            convolutionVisualSecond: getSrc(CDN_IMAGE.CONVOLUTION_VISUAL_SECOND, false),

        }
    }

    handleNextClick(callback) {
        callback(true)
    }

    render() {
        return (
            <StepPage onNext={this.handleNextClick.bind(this)}>
                <View className='flex flex-center flex-direction-column'>
                    <View className='header flex flex-center flex-direction-column'>
                        <Text className='header-text'>卷积结果第一层</Text>
                    </View>
                    <Image src={this.state.imgs.convolutionVisualFirst} className='visual-img img'></Image>
                </View>
                <View className='flex flex-center flex-direction-column'>
                    <View className='header flex flex-center flex-direction-column'>
                        <Text className='header-text'>第一、二层卷积输出</Text>
                    </View>
                    <Image src={this.state.imgs.convolutionVisualSecond} className='second-visual-img'></Image>
                </View>
            </StepPage>
        );
    }
}