import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ATButton, AtRadio } from "taro-ui";
import Panel from "./../../../components/Panel/index";
import FloatLayout from "./../../../components/FloatLayout/index";
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

  render() {
    const { helpFloatLayoutOpened } = this.state;
    return (
      <View className='step-container'>
        <Panel title='请选择卷积层数' onHelp={this.handleHelpClick.bind(this)}>
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
          <ATButton
            type='primary'
            className='confirm-btn'
            onClick={() => {
              this.handleConfimClick();
            }}
          >
            确认
          </ATButton>
        </Panel>
        <FloatLayout
          isOpened={helpFloatLayoutOpened}
          onClose={() => {
            this.handeCloseHelpFloatLayoutClick();
          }}
          type='block'
        ></FloatLayout>
      </View>
    );
  }
}
