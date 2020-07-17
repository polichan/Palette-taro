import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import ToolBar from "@/components/ToolBar";
import NavBar from "@/components/NavBar";
import { connect } from "@tarojs/redux";
import _isFunction from "lodash/isFunction";
import { AtProgress } from "taro-ui";
import Panel from "@/components/Panel";
import NetStatusTip from "@/components/NetStatusTip";
import "./index.scss";

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class StepPage extends Component {
  static defaultProps = {
    onNext: () => {},
    onBack: () => {},
    nextButtonLoading: false,
    backButtonLoading: false,
    showPanel: true,
    showProgressBar: true
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
      this.props.onNext(canNext => {
        if (canNext) {
          this.props.step.stepQueue
            .next()
            .then(() => {
              this.setProgressPercent();
              Taro.navigateTo({
                url: this.props.step.stepQueue.getCurrent().getPagePath()
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
    this.props.step.stepQueue.back().then(this.setProgressPercent(false));
  }

  options = {
    addGlobalClass: true
  }

  render() {
    const { stepQueue, progressPercent } = this.props.step;
    const { nextButtonLoading, showPanel, showProgressBar } = this.props;
    return (
      <View className='step-page'>
        <NavBar
          background='#fff'
          back
          title={stepQueue.getCurrent().getNavigationTitle()}
          onBack={this.handleBack.bind(this)}
        />
        <NetStatusTip />
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
        </View>
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
