import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import Problem from "@/components/Problem";
import PROBLEM_CONSTANT from "../../../constants/problem";
import "./index.scss";

export default class Binarization extends Component {
  handleNextClick(callback) {
    if (this.problem.isAnswerRight()) {
      callback(true);
    } else {
      Taro.showToast({
        icon: "none",
        title: "答案不正确！"
      });
    }
  }

  refProblem = node => {
    this.problem = node;
  };

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <Problem
          data={PROBLEM_CONSTANT.BINARIZATION.DATA}
          questionApi={PROBLEM_CONSTANT.BINARIZATION.QUESTION_API}
          showRealQuestionTab={false}
          ref={this.refProblem}
        ></Problem>
      </StepPage>
    );
  }
}
