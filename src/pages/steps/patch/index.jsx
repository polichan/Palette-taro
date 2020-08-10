import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import FloatLayout from "@/components/FloatLayout/index";
import StepPage from "@/components/StepPage";
import GuideTip from "@/components/GuideTip";
import * as CONSTANT from "@/constants/index";
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ step, loading }) => ({
  step,
  loading
}))
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
    if (!Taro.getStorageSync(CONSTANT.HAS_SHOWN_GUIDE_TIP)) {
      this.setState({
        showGuideTip: true
      });
    }
  }

  config = {
    navigationBarTitleText: "选择 Patch"
  };

  handleGuideTipConfirmClick() {
    this.setState(
      {
        showGuideTip: false
      },
      () => {
        Taro.setStorageSync(CONSTANT.HAS_SHOWN_GUIDE_TIP, true);
      }
    );
  }

  handlePatchChange(value) {
    this.setState({
      value: value
    });
  }

  handleNextClick(callback) {
    const value = this.state.value;
    if (value != null) {
      this.props
        .dispatch({
          type: "step/saveStep",
          payload: {
            data: {
              patchSize: value
            }
          }
        })
        .then(() => {
          callback(true);
        });
    } else {
      Taro.showToast({
        icon: "none",
        title: "请选择 Patch 大小"
      });
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
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel={false}>
        <View hidden={!showGuideTip}>
          <GuideTip onConfirm={this.handleGuideTipConfirmClick.bind(this)} />
        </View>
        <View className='patch-container'>
          <Panel
            title='请选择 Patch 大小'
            onHelp={this.handleHelpClick.bind(this)}
          >
            <AtRadio
              options={[
                {
                  label: "31 * 31",
                  value: "31x31"
                },
                {
                  label: "29 * 29",
                  value: "29x29"
                },
                {
                  label: "27 * 27",
                  value: "27x27"
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
