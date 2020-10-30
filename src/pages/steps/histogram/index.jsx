import Taro, { Component } from "@tarojs/taro";
import { View, Image} from "@tarojs/components";
import StepPage from "@/components/StepPage";
import Panel from "@/components/Panel";
import FloatLayout from "@/components/FloatLayout";
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

export default class Histogram extends Component {
  state = {
    helpFloatLayoutOpened: false,
    imgs:{
      histogramVisualImg: getLocalCacheImageSrc(CDN_IMAGE.HISTOGRAM_VISUAL)
    }
  };

  handeCloseHelpFloatLayoutClick() {
    this.setState({
      helpFloatLayoutOpened: !this.state.helpFloatLayoutOpened
    });
  }

  handleHelpClick() {
    this.setState({
      helpFloatLayoutOpened: !this.state.helpFloatLayoutOpened
    });
  }

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    const { helpFloatLayoutOpened } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel={false}>
        <Panel title='直方图及直方图可视化' onHelp={this.handleHelpClick.bind(this)}>
          <View className='histogram-container flex flex-center flex-direction-column'>
            <Image src={this.state.imgs.histogramVisualImg} className='histogram-img'></Image>
          </View>
        </Panel>
        <FloatLayout
          isOpened={helpFloatLayoutOpened}
          onClose={() => {
            this.handeCloseHelpFloatLayoutClick();
          }}
          type='histogram'
        ></FloatLayout>
      </StepPage>
    );
  }
}
