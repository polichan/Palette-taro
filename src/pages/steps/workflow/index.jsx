import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { getLocalCacheImageSrc } from "@/utils/utils";
import { connect } from "@tarojs/redux";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class Index extends Component {
  state = {
    workFlowImg: getLocalCacheImageSrc(CDN_IMAGE.WORKFLOW)
  };

  componentDidMount() {
    this.props
      .dispatch({
        type: "step/startExperiment"
      })
      .then(() => {
        Taro.showToast({
          icon: "none",
          title: "仿真实验正式开始~"
        });
      });
  }

  handleImageClick() {
    Taro.previewImage({
      current: this.state.workFlowImg,
      urls: [this.state.workFlowImg]
    });
  }

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    return (
      <View className='workflow-page'>
        <StepPage onNext={this.handleNextClick.bind(this)}>
          <Image
            lazyLoad
            src={this.state.workFlowImg}
            mode='aspectFit'
            className='work-flow-img'
            onClick={this.handleImageClick.bind(this)}
          ></Image>
        </StepPage>
      </View>
    );
  }
}
