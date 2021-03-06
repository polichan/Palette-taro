import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ToolBar from "@/components/ToolBar";
import NavBar from "@/components/NavBar";
import { connect } from "@tarojs/redux";
import _isFunction from "lodash/isFunction";
import { AtProgress } from "taro-ui";
import Panel from "@/components/Panel";
import { navigateTo } from "@/utils/utils";
import { STORAGE_STEP_QUEUE_KEY } from "@/constants";
import "./index.scss";

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class StepPage extends Component {
  static defaultProps = {
    onNext: () => { },
    onBack: () => { },
    nextButtonLoading: false,
    backButtonLoading: false,
    showPanel: true,
    showProgressBar: true,
    nextButtonDisabled: false,
    showNextButton: true
  };

  componentWillMount() {
    if (!this.props.step.hasBuiltStepQueue) {
      this.props
        .dispatch({
          type: "step/buildStepQueue"
        })
        .then();
    }
  }

  componentDidMount() {
    this.props.step.stepQueue.getCurrent().setBeginTime();
  }

  setProgressPercent(add = true) {
    const all = this.props.step.stepQueue.getAll().length;
    this.props.dispatch({
      type: add ? "step/addProgressPercent" : "step/minusProgressPercent",
      payload: {
        progressPercent: 100 / all
      }
    });
  }

  handleNextStepClick() {
    if (_isFunction(this.props.onNext)) {
      this.props.step.stepQueue.getCurrent().setEndTime();
      this.props.onNext(canNext => {
        if (canNext) {
          this.props.step.stepQueue
            .next()
            .then(() => {
              // 进度条增加
              this.setProgressPercent();
              // 缓存到本地
              // this.saveCurrentStepQueue();
              navigateTo(this.props.step.stepQueue.getCurrent().getPagePath());
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

  handleBack() {
    if (Taro.getCurrentPages().length - 1 != 0) {
      this.props.step.stepQueue.back().then(() => {
        Taro.navigateBack()
        this.setProgressPercent(false)
      }).catch(() => {
        // 如果不能返回了
        this.props
          .dispatch({
            type: "step/resetStep"
          })
          .then(() => {
            this.props
              .dispatch({
                type: "step/buildStepQueue"
              }).then(() => {
                Taro.navigateBack()
              })
          });
      });
    }
  }

  reportErrorToCurrentStep(err) {
    return new Promise((resolve, reject) => {
      if (this.props.step.stepQueue.getCurrent().setError(err)) {
        resolve();
      } else {
        reject();
      }
    });
  }

  saveCurrentStepQueue() {
    try {
      Taro.setStorageSync(STORAGE_STEP_QUEUE_KEY, this.props.step.stepQueue);
    } catch (error) {
      Taro.showToast({
        icon: "none",
        title: "缓存进度失败"
      });
    }
  }

  options = {
    addGlobalClass: true
  };

  render() {
    const { stepQueue, progressPercent } = this.props.step;
    const {
      nextButtonLoading,
      showPanel,
      showProgressBar,
      nextButtonDisabled,
      showNextButton
    } = this.props;
    const shouldShowBack = Taro.getCurrentPages().length - 1 != 0
    return (
      <View className='step-page'>
        <NavBar
          background='#fff'
          back={shouldShowBack}
          title={stepQueue.getCurrent().getNavigationTitle()}
          onBack={this.handleBack.bind(this)}
        />
        {showProgressBar ? (
          <Panel title='当前实验进度：'>
            <View className='progress-bar-container'>
              <AtProgress
                percent={progressPercent}
                isHidePercent
                color='#18a8f6'
                className='progress-bar'
              />
            </View>
          </Panel>
        ) : null}
        <View className='main-content'>
          {showPanel ? (
            <Panel title={stepQueue.getCurrent().getNavigationTitle() + "："}>
              <View className='container'>{this.props.children}</View>
            </Panel>
          ) : (
              <View className='container'>{this.props.children}</View>
            )}
          <View className='safe-area-block-container'></View>
        </View>
        <View className='footer-content flex flex-direction-column flex-center'>
          <ToolBar
            title={stepQueue.getCurrent().getButtonTitle()}
            onClick={this.handleNextStepClick.bind(this)}
            nextButtonLoading={nextButtonLoading}
            nextButtonDisabled={nextButtonDisabled}
            showNextButton={showNextButton}
          />
        </View>
      </View>
    );
  }
}
