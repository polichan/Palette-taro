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
    navigationTitle: "实验流程图",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/workflow/index"
  })
);
sQueue.add(
  new Step({
    navigationTitle: "选择人脸图像",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/face/index"
  })
);
sQueue.add(
  new Step({
    navigationTitle: "选择 Patch",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/patch/index"
  })
);
sQueue.add(
  new Step({
    navigationTitle: "Patch 可视化",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/patch_visual/index"
  })
);

sQueue.add(
  new Step({
    navigationTitle: "特征向量和特征值",
    buttonTitle: "提交解答",
    pagePath: "/pages/steps/characteristic/index"
  })
);

sQueue.add(new Step({
  navigationTitle:"特征值可视化",
  buttonTitle: "下一步",
  pagePath: "/pages/steps/characteristic_visual/index"
}))


export default class StepPage extends Component {

  static defaultProps = {
    onNext: () => {},
    onBack: () => {},
    nextButtonLoading: false,
    backButtonLoading: false
  }

  state = {
    stepQueue: sQueue
  };

  componentWillMount() {
    this.setSteps();
  }

  setSteps() {}

  handleNextStepClick() {
    if (_isFunction(this.props.onNext)) {
      this.props.onNext(canNext => {
        if (canNext) {
          this.state.stepQueue
            .next()
            .then(() => {
              Taro.navigateTo({
                url: this.state.stepQueue.getCurrent().getPagePath()
              });
            })
            .catch(() => {
              Taro.showToast({
                title: "没有下一步了",
                icon: "none"
              });
            });
        }
      });
    }
  }


  handleBackClick() {
    if (_isFunction(this.props.onBack)) {
      this.props.onBack();
    }
    this.state.stepQueue.back().then(() => {
      Taro.navigateTo({
        url: this.state.stepQueue.getCurrent().getPagePath()
      });
    });
  }

  handleBack() {
    this.state.stepQueue.back();
  }

  render() {
    const { stepQueue } = this.state;
    const {nextButtonLoading} = this.props
    return (
      <View>
        <NavBar
          background='#fff'
          back
          title={stepQueue.getCurrent().getNavigationTitle()}
          onBack={this.handleBack.bind(this)}
        />
        <View className='main-content'>{this.props.children}</View>
        <View className='footer-content flex flex-direction-column flex-center'>
          <ToolBar
            title={stepQueue.getCurrent().getButtonTitle()}
            onClick={this.handleNextStepClick.bind(this)}
            nextButtonLoading={nextButtonLoading}
          />
        </View>
      </View>
    );
  }
}
