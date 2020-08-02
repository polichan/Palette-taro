import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import {getSrc} from "@/utils/utils";
import {CDN_IMAGE} from "../../../constants/index";
import "./index.scss";

export default class Index extends Component {
  state = {
    workFlowImg: getSrc(CDN_IMAGE.WORKFLOW, false)
  }
  componentDidMount() {}

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
