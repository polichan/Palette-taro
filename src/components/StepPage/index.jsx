import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ToolBar from "@/components/ToolBar";
import NavBar from "@/components/NavBar";
import StepQueue from "@/utils/steps/stepsQueue";
import Step from "@/utils/steps/step";
import _isFunction from "lodash/isFunction";
import "./index.scss";

let sQueue = new StepQueue();
sQueue.add(
  new Step({
    navigationTitle: "流程图",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/workflow/index"
  })
);
sQueue.add(
  new Step({
    navigationTitle: "人脸图像",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/face/index"
  })
);
sQueue.add(
  new Step({
    navigationTitle: "选择Patch",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/patch/index"
  })
);
sQueue.add(
  new Step({
    navigationTitle: "Patch可视化",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/patch_visual/index"
  })
);

export default class StepPage extends Component {
  state = {
    stepQueue: sQueue
  };

  componentWillMount() {
    this.setSteps();
  }

  setSteps() {}

  handleNextStepClick() {
    if (_isFunction(this.props.onNext)) {
      this.props.onNext();
    }
    this.state.stepQueue.next().then(() => {
      Taro.navigateTo({
        url: this.state.stepQueue.getCurrent().getPagePath()
      });
    }).catch(() => {
      Taro.showToast({
        title: '没有下一步了',
        icon: 'none'
      })
    })
  }

  handleBack() {
    this.state.stepQueue.back();
  }

  render() {
    const { stepQueue } = this.state;
    return (
      <View>
        <NavBar
          background='#fff'
          back
          title={stepQueue.getCurrent().getNavigationTitle()}
          onBack={this.handleBack.bind(this)}
        />
        <View className='main-content'>{this.props.children}</View>
        <View className='footer-content'>
          <ToolBar
            title={stepQueue.getCurrent().getButtonTitle()}
            onClick={this.handleNextStepClick.bind(this)}
          />
        </View>
      </View>
    );
  }
}
