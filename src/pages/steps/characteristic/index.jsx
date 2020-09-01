import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import { connect } from "@tarojs/redux";
import Problem from "@/components/Problem";
import PROBLEM_CONSTANT from "@/constants/problem";
import "./index.scss";

@connect(({ question, loading }) => ({
  question,
  loading
}))
export default class Characteristic extends Component {
  handleNextClick(callback) {
    if (this.problem.isAnswerRight()) {
      callback(true);
    } else {
      this.stepPage.reportErrorToCurrentStep("答案选择不正确").then(() => {
        Taro.showToast({
          icon: "none",
          title: "答案不正确！"
        });
      });
    }
  }

  refStepPage = node => {
    this.stepPage = node;
  };

  refProblem = node => {
    this.problem = node;
  };

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} ref={this.refStepPage}>
        <Problem
          data={PROBLEM_CONSTANT.CHARACTERISTIC.DATA}
          questionApi={PROBLEM_CONSTANT.CHARACTERISTIC.QUESTION_API}
          ref={this.refProblem}
        ></Problem>
      </StepPage>
    );
  }
}
