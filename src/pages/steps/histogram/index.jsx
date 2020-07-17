import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import Panel from "@/components/Panel";
import FloatLayout from "@/components/FloatLayout";
import HistogramImg from "../../../assets/imgs/histogram_visual.png";
import "./index.scss";

export default class Histogram extends Component {
  state = {
    helpFloatLayoutOpened: false
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
            <Image src={HistogramImg}></Image>
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
