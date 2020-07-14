import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import StepPage from '@/components/StepPage'
import WorkFlowPng from '../../../assets/imgs/workflow.png'
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  
  handleImageClick()
  {
    Taro.previewImage({
      urls: [WorkFlowPng]
    })
  }

  render() {
    return (
      <View className='workflow-page'>
        <StepPage>
          <Image src={WorkFlowPng} mode='aspectFit' className='work-flow-img' onClick={this.handleImageClick.bind(this)}></Image>
        </StepPage>
      </View>
    );
  }
}
