import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import Problem from "@/components/Problem";
import PROBLEM_CONSTANT from "../../../constants/problem";
import "./index.scss";

export default class Binarization extends Component {

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <Problem data={PROBLEM_CONSTANT.BINARIZATION.DATA} questionApi={PROBLEM_CONSTANT.BINARIZATION.QUESTION_API}></Problem>
      </StepPage>
    );
  }
}
