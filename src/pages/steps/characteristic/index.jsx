import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Article from "@/components/Article";
import { AtAccordion } from "taro-ui";
import StepPage from "@/components/StepPage";
import Question from "@/components/Question";
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ question, loading }) => ({
  question,
  loading
}))
export default class Characteristic extends Component {
  state = {
    data: {
      title: "什么是特征向量和特征值?",
      sections: [
        "假设我们取到的是第i张图片，那么我们上一步进行了对图片分块（取patch）的过程，每一个patch对应一个矩阵，然后将矩阵变成列向量，减去对应每一列的均值，得到了一个X矩阵，然后求解X乘上X的转置。得出的矩阵的解就是我们要求的特征值和特征向量。我们可以从接下来的特征值和特征向量可视化中看出在前面的特征值和特征向量能量占比很大"
      ]
    },
    exampleOpen: true,
    solutionOpen: false,
    questions: {
      example: {}
    }
  };

  componentWillMount() {
    this.props
      .dispatch({
        type: "question/getQuestionById",
        payload: {
          data: {
            ID: 7
          }
        }
      })
      .then(res => {
        this.setState({
          questions: Object.assign(this.state.questions, {
            example: res.data.recrmProblems
          })
        });
      });
  }

  options = {
    addGlobalClass: true
  }

  handleAccordionOpen(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    const { data, exampleOpen, solutionOpen, questions } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='question-container'>
          <View className='question-explain'>
            <Article title={data.title} sections={data.sections}></Article>
          </View>
          <AtAccordion
            open={exampleOpen}
            onClick={this.handleAccordionOpen.bind(this, "exampleOpen")}
            title='题目举例'
          >
            <Question
              title={data.title}
              content={questions.example.content}
            ></Question>
          </AtAccordion>
          <AtAccordion
            open={solutionOpen}
            onClick={this.handleAccordionOpen.bind(this, "solutionOpen")}
            title='实战解答'
          >
            <Question
              content={questions.example.content}
            ></Question>
          </AtAccordion>
        </View>
      </StepPage>
    );
  }
}
