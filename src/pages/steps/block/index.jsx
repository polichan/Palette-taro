import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import FloatLayout from "@/components/FloatLayout/index";
import StepPage from "@/components/StepPage";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockValue: null,
      helpFloatLayoutOpened: false
    };
  }
  componentDidMount() {}

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
    callback(true);
  }

  render() {
    const { helpFloatLayoutOpened } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='step-container'>
          <Panel
            title='请选择卷积层数'
            onHelp={this.handleHelpClick.bind(this)}
          >
            <AtRadio
              options={[
                {
                  label: "5 * 5",
                  value: "1"
                },
                {
                  label: "7 * 7",
                  value: "2"
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
