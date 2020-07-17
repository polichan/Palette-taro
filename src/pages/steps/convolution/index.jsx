import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ATButton, AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import FloatLayout from "@/components/FloatLayout/index";
import StepPage from "@/components/StepPage";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convolutionValue: null,
      helpFloatLayoutOpened: false
    };
  }
  componentDidMount() {}

  config = {
    navigationBarTitleText: "选择卷积层数"
  };

  handleConvolutionChange(value) {
    this.setState({
      convolutionValue: value
    });
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

  handleNextClick(callback){
    if(this.state.convolutionValue == null)
    {
      Taro.showToast({
        icon: 'none',
        title: '请选择卷积层数'
      })
      callback(false)
      return
    }
    callback(true)
  }

  render() {
    const { helpFloatLayoutOpened } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel={false}>
        <View className='step-container'>
          <Panel
            title='请选择卷积层数'
            onHelp={this.handleHelpClick.bind(this)}
          >
            <AtRadio
              options={[
                {
                  label: "一层",
                  value: "1"
                },
                {
                  label: "两层",
                  value: "2"
                }
              ]}
              value={this.state.convolutionValue}
              onClick={this.handleConvolutionChange.bind(this)}
            />
          </Panel>
          <FloatLayout
            isOpened={helpFloatLayoutOpened}
            onClose={() => {
              this.handeCloseHelpFloatLayoutClick();
            }}
            type='convolution'
          >
            
          </FloatLayout>
        </View>
      </StepPage>
    );
  }
}
