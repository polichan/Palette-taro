import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import FloatLayout from "@/components/FloatLayout/index";
import StepPage from "@/components/StepPage";
import { getSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
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
      convolutionValue: null,
      helpFloatLayoutOpened: false,
      imgs: {
        ConvolutionImg: getSrc(CDN_IMAGE.CONVOLUTION_VISUAL, false)
      }
    };
  }
  componentDidMount() { }

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


  handleNextClick(callback) {
    const convolutionValue = this.state.convolutionValue
    if (convolutionValue != null) {
      this.props.dispatch({
        type: 'step/saveStep',
        payload: {
          data: {
            numStages: convolutionValue
          }
        }
      }).then(() => {
        callback(true);
      })
    } else {
      Taro.showToast({
        icon: 'none',
        title: '请选择卷积层数'
      })
    }
  }

  handleImageLoad() {
    const gifurl = this.state.imgs.ConvolutionImg;
    const nowTime = + new Date();
    setTimeout(() => {
      this.setState({
        patchVisualImg: gifurl + '?' + nowTime
      })
    }, 9000)
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
                  value: "一层"
                },
                {
                  label: "二层",
                  value: "二层"
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
            <Image src={this.state.imgs.ConvolutionImg} lazyLoad className='convolution-img'></Image>
          </FloatLayout>
        </View>
      </StepPage>
    );
  }
}
