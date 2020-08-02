import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import { connect } from "@tarojs/redux";
import Problem from "@/components/Problem";
import PROBLEM_CONSTANT from "../../../constants/problem";
import "./index.scss";

@connect(({ question, loading }) => ({
  question,
  loading
}))
export default class Characteristic extends Component {

  handleNextClick(callback) {
    callback(true);
  }

  render() {

    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <Problem
          data={PROBLEM_CONSTANT.CHARACTERISTIC.DATA}
          questionApi={PROBLEM_CONSTANT.CHARACTERISTIC.QUESTION_API}
        ></Problem>
      </StepPage>
    );
  }
}
