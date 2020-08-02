import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Article from "@/components/Article";
import StepPage from "@/components/StepPage";
import Question from "@/components/Question";
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from "@tarojs/redux";
import Skeleton from "taro-skeleton";
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
    questions: {
      example: {
        content: ""
      },
      real: {
        content: ""
      }
    },
    current: 0,
    tabList: [{ title: "题目举例" }, { title: "实战解答" }],
    hasLoadedTabList: [0]
  };



  componentWillMount() {
    Taro.nextTick(()=>{
      this.getExampleQuestion().then(res => {
        this.setState({
          questions: Object.assign(this.state.questions, { example: res })
        })
      })
    })
  }

  handleTabClick(value) {
    if (this.state.hasLoadedTabList.indexOf(value) == -1) {
      this.setState({
        current: value,
        hasLoadedTabList: this.state.hasLoadedTabList.concat([value])
      }, () => {
        if (value === 1) {
          this.getRealQuestion().then(res => {
            this.setState({
              questions: Object.assign(this.state.questions, { real: res })
            })
          })
        }
      })
    }else{
      this.setState({
        current: value
      })
    }
  }

  getExampleQuestion() {
    return new Promise((resolve) => {
      this.props
        .dispatch({
          type: "question/getQuestionById",
          payload: {
            data: {
              ID: 1
            }
          }
        })
        .then(res => {
          resolve(res.data.recrmProblems)
        });
    })
  }

  getRealQuestion() {
    return new Promise((resolve) => {
      this.props
        .dispatch({
          type: "question/getQuestionById",
          payload: {
            data: {
              ID: 3
            }
          }
        })
        .then(res => {
          resolve(res.data.recrmProblems)
        });
    })
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
    const isQuestionLoading = this.props.loading.effects['question/getQuestionById']
    const { data, questions, tabList } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='question-container'>
          <View className='question-explain'>
            <Article sections={data.sections}></Article>
          </View>
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleTabClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <Skeleton
                animateName='elastic'
                title
                row={2}
                rowWidth={["100%", "50%"]}
                loading={isQuestionLoading}
              >
                <View className='question-item-container'>
                  <Question content={questions.example.content}></Question>
                </View>
              </Skeleton>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <Skeleton
                animateName='elastic'
                title
                row={2}
                rowWidth={["100%", "50%"]}
                loading={isQuestionLoading}
              >
                <View className='question-item-container'>
                  <Question content={questions.real.content}></Question>
                </View>
              </Skeleton>
            </AtTabsPane>
          </AtTabs>
        </View>
      </StepPage>
    );
  }
}
