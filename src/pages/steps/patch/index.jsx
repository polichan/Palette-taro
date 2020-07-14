import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ATButton, AtRadio } from "taro-ui";
import Panel from "./../../../components/Panel/index";
import FloatLayout from "./../../../components/FloatLayout/index";
import StepPage from "@/components/StepPage";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      helpFloatLayoutOpened: false
    };
  }
  componentDidMount() {}

  config = {
    navigationBarTitleText: "选择 Patch"
  };

  handlePatchChange(value) {
    this.setState({
      value: value
    });
  }

  handleConfirmClick() {
    console.log(this.state);
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
    const { helpFloatLayoutOpened } = this.state;
    return (
      <StepPage>
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
            {/* <ATButton
              type='primary'
              className='confirm-btn'
              onClick={() => {
                this.handleConfimClick();
              }}
            >
              确认
            </ATButton> */}
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
