import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { navigateTo , getLocalCacheImageSrc } from "@/utils/utils";
import { connect } from "@tarojs/redux";
import { CDN_IMAGE } from "@/constants/index";
import "./index.scss";

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class Thanks extends Component {
  config = {
    navigationBarTitleText: "感谢测试"
  };

  handleNextClick(callback) {
    callback(false);
    this.props
      .dispatch({
        type: "step/resetStep"
      })
      .then(() => {
        navigateTo("/pages/index/index");
      });
  }

  render() {
    return (
      <StepPage
        onNext={this.handleNextClick.bind(this)}
        showPanel={false}
        showProgressBar={false}
      >
        <View className='success-container flex flex-center flex-direction-column'>
          <Image
            src={getLocalCacheImageSrc(CDN_IMAGE.SMILE_ICON)}
            className='thanks-img'
          ></Image>
          <Text className='thanks-text'>实验结束，感谢测试</Text>
        </View>
      </StepPage>
    );
  }
}
