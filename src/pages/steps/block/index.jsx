import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import FloatLayout from "@/components/FloatLayout/index";
import StepPage from "@/components/StepPage";
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
      blockValue: null,
      helpFloatLayoutOpened: false
    };
  }
  componentDidMount() { }

  config = {
    navigationBarTitleText: "选择 Block"
  };

  handleBlockChange(value) {
    this.setState({
      blockValue: value
    });
  }

  handleConfirmClick() {
    console.log(this.state);
  }

  handeCloseHelpFloatLayoutClick() {
    this.setState({
      helpFloatLayoutOpened: false
    });
  }

  handleHelpClick() {
    this.setState({
      helpFloatLayoutOpened: true
    });
  }

  handleNextClick(callback) {
    const blockValue = this.state.blockValue
    if (blockValue != null) {
      this.props.dispatch({
        type: 'step/saveStep',
        payload: {
          data:{
            histBlockSize: blockValue
          }
        }
      }).then(() => {
        callback(true);
      })
    } else {
      Taro.showToast({
        title: '请选择 Block 大小',
        icon: 'none'
      })
    }
  }

  render() {
    const { helpFloatLayoutOpened } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel={false}>
        <View className='step-container'>
          <Panel
            title='请选择 Block 的大小'
            onHelp={this.handleHelpClick.bind(this)}
          >
            <AtRadio
              options={[
                {
                  label: "8 * 8",
                  value: "8x8"
                },
                {
                  label: "16 * 16",
                  value: "16x16"
                },
                {
                  label: "32 * 32",
                  value: "32x32"
                }
              ]}
              value={this.state.blockValue}
              onClick={this.handleBlockChange.bind(this)}
            />
          </Panel>
          <FloatLayout
            isOpened={helpFloatLayoutOpened}
            onClose={() => {
              this.handeCloseHelpFloatLayoutClick();
            }}
            type='block'
          ></FloatLayout>
        </View>
      </StepPage>
    );
  }
}
