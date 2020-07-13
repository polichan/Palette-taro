import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ToolBar from '@/components/ToolBar'
import NavBar from "@/components/NavBar";
import StepQueue from "@/utils/steps/stepsQueue"
import Step from "@/utils/steps/step"
import "./index.scss";

let sQueue = new StepQueue()
sQueue.add(new Step({navigationTitle: "流程图", buttonTitle: "下一步", pagePath: "/pages/steps/workflow/index"}))
sQueue.add(new Step({navigationTitle: "人脸图像", buttonTitle: "下一步", pagePath: "/pages/steps/face/index"}))
export default class StepPage extends Component {
  state = {
    stepQueue: sQueue
  };

  componentWillMount()
  {
      this.setSteps()
  }

  setSteps()
  {
  }

  handleNextStepClick() {
      this.state.stepQueue.next()
      Taro.navigateTo({
          url: this.state.stepQueue.getCurrent().pagePath
      })
  }

  handleBack()
  {
      this.state.stepQueue.back()
  }

  render() {
      const {stepQueue} = this.state
    return (
      <View>
        <NavBar background='#fff' back home title={stepQueue.getCurrent().navigationTitle} onBack={this.handleBack.bind(this)} />
        <View className='main-content'>
            {this.props.children}
        </View>
        <View className='footer-content'>
          <ToolBar title={stepQueue.getCurrent().buttonTitle} onClick={this.handleNextStepClick.bind(this)} />
        </View>
      </View>
    );
  }
}
