import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import StepPage from "@/components/StepPage";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: null,
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

  handleNextClick(callback) {
    if(this.state.filterValue == null)
    {
      Taro.showToast({
        icon: 'none',
        title: '请选择 filter'
      })
      callback(false)
      return
    }
    callback(true);
  }

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='step-container'>
          <Panel
            title='请选择 Filter 个数'
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
          </Panel>
        </View>
      </StepPage>
    );
  }
}
