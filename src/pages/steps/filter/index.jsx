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
      filterValue: null,
      helpFloatLayoutOpened: false
    };
  }
  componentDidMount() {}

  config = {
    navigationBarTitleText: "选择 Filter"
  };

  handleFilterChange(value) {
    this.setState({
      filterValue: value
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
        <Panel
          title='请选择 Filter 个数'
          onHelp={this.handleHelpClick.bind(this)}
        >
          <AtRadio
            options={[
              {
                label: "L1=10",
                value: "1"
              },
              {
                label: "L1=8",
                value: "2"
              },
              {
                label: "L1=6",
                value: "3"
              }
            ]}
            value={this.state.filterValue}
            onClick={this.handleFilterChange.bind(this)}
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
          type='filter'
        ></FloatLayout>
      </View>
    );
  }
}
