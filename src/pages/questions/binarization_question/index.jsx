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
            this.stepPage
                .reportErrorToCurrentStep(
                    `【实战解答】答案选择错误，正确答案：${this.problem.getRightAnswer()}，用户选择答案：${this.problem.getSelectedAnswer()}`
                )
                .then(() => {
                    Taro.showToast({
                        icon: "none",
                        title: "答案不正确！"
                    });
                });
        }
    }

    refProblem = node => {
        this.problem = node;
    };

    refStepPage = node => {
        this.stepPage = node;
    };

    render() {
        return (
            <StepPage onNext={this.handleNextClick.bind(this)} ref={this.refStepPage}>
                <Problem
                  data={PROBLEM_CONSTANT.BINARIZATION.DATA}
                  questionApi={PROBLEM_CONSTANT.BINARIZATION.QUESTION_API}
                  showExampleQuestionTab={false}
                  ref={this.refProblem}
                ></Problem>
            </StepPage>
        );
    }
}