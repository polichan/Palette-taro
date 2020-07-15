import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ATButton, AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import FloatLayout from "@/components/FloatLayout/index";
import StepPage from "@/components/StepPage";
import GuideTip from "@/components/GuideTip";
import * as CONSTANT from "@/constants/index";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      helpFloatLayoutOpened: false,
      showGuideTip: false
    };
  }

  componentWillMount() {
    if (Taro.getStorageSync(CONSTANT.FIRST_LAUNCH_KEY)) {
      this.setState({
        showGuideTip: true
      })
    }
  }


  componentDidMount() { }

  config = {
    navigationBarTitleText: "选择 Patch"
  };

  handleGuideTipConfirmClick() {
    this.setState({
      showGuideTip: false
    }, () => {
      Taro.setStorageSync(CONSTANT.FIRST_LAUNCH_KEY, false)
    })
  }

  handlePatchChange(value) {
    this.setState({
      value: value
    });
  }

  handleOnNextClick(callback) {
    if (this.state.value == null) {
      Taro.showToast({
        icon: 'none',
        title: '请选择 Patch 大小'
      })
      callback(false)
    } else {
      callback(true)
    }
  }

  handleHelpClick() {
    this.setState({
      helpFloatLayoutOpened: true
    });
  }

  handeCloseHelpFloatLayoutClick() {
    this.setState({
      helpFloatLayoutOpened: false
    });
  }

  render() {
    const { helpFloatLayoutOpened, showGuideTip } = this.state;
    return (
      <StepPage onNext={this.handleOnNextClick.bind(this)}>
        <View hidden={!showGuideTip}>
          <GuideTip onConfirm={this.handleGuideTipConfirmClick.bind(this)} />
        </View>
        <View className='step-container'>
          <Panel
            title='请选择 Patch 大小'
            onHelp={this.handleHelpClick.bind(this)}
          >
            <AtRadio
              options={[
                {
                  label: "31 * 31",
                  value: "1",
                  desc: "Patch 大小为 31 x 31 像素"
                },
                {
                  label: "29 * 29",
                  value: "2",
                  desc: "Patch 大小为 29 x 29 像素"
                },
                {
                  label: "27 * 27",
                  value: "3",
                  desc: "Patch 大小为 27 x 27 像素"
                }
              ]}
              value={this.state.value}
              onClick={this.handlePatchChange.bind(this)}
            />
          </Panel>
          <FloatLayout
            isOpened={helpFloatLayoutOpened}
            onClose={() => {
              this.handeCloseHelpFloatLayoutClick();
            }}
            type='patch'
          ></FloatLayout>
        </View>
      </StepPage>
    );
  }
}
