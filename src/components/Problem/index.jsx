import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Skeleton from "taro-skeleton";
import Article from "@/components/Article";
import Question from "@/components/Question";
import { connect } from "@tarojs/redux";
import ProblemOptions from "@/components/ProblemOptions";
import "./index.scss";

@connect(({ question, loading }) => ({
  question,
  loading
}))
export default class Problem extends Component {
  static defaultProps = {
    questionApi: {
      example: () => {},
      real: () => {}
    },
    data: {
      title: "什么是特征向量和特征值?",
      sections: [
        "假设我们取到的是第i张图片，那么我们上一步进行了对图片分块（取patch）的过程，每一个patch对应一个矩阵，然后将矩阵变成列向量，减去对应每一列的均值，得到了一个X矩阵，然后求解X乘上X的转置。得出的矩阵的解就是我们要求的特征值和特征向量。我们可以从接下来的特征值和特征向量可视化中看出在前面的特征值和特征向量能量占比很大"
      ]
    },
    showRealQuestionTab: true
  };

  state = {
    current: 0,
    tabList: [{ title: "题目举例" }, { title: "实战解答" }],
    hasLoadedTabList: [0],
    questions: {
      example: {
        data: ""
      },
      real: {
        data: ""
      }
    },
    selectedOption: [],
    shouldShowProblemOptionTip: false
  };

  componentWillMount() {
    // 是否显示实战解答选项卡
    if (!this.props.showRealQuestionTab) {
      this.setState({
        tabList: [{ title: "题目举例" }]
      });
    }
    Taro.nextTick(() => {
      this.getExampleQuestion().then(res => {
        this.setState({
          questions: Object.assign(this.state.questions, {
            example: { data: res }
          })
        });
      });
    });
  }

  getExampleQuestion() {
    return new Promise(resolve => {
      this.props
        .dispatch({
          type: "question/getQuestionById",
          payload: {
            data: {
              ID: this.props.questionApi.example.ID
            }
          }
        })
        .then(res => {
          resolve(res.data.recrmProblems);
        });
    });
  }

  getRealQuestion() {
    return new Promise(resolve => {
      this.props
        .dispatch({
          type: "question/getQuestionById",
          payload: {
            data: {
              ID: this.props.questionApi.real.ID
            }
          }
        })
        .then(res => {
          resolve(res.data.recrmProblems);
        });
    });
  }

  handleTabClick(value) {
    if (this.state.hasLoadedTabList.indexOf(value) == -1) {
      this.setState(
        {
          current: value,
          hasLoadedTabList: this.state.hasLoadedTabList.concat([value])
        },
        () => {
          if (value === 1) {
            //实战解答问题
            this.getRealQuestion().then(res => {
              this.setState({
                questions: Object.assign(this.state.questions, {
                  real: { data: res }
                })
              });
            });
          }
        }
      );
    } else {
      this.setState({
        current: value
      });
    }
  }

  handleProblemOptionSelect(option) {
    this.setState({
      selectedOption: option
    });
  }

  isAnswerRight() {
    let res = false;
    const answerId =
      this.state.questions.real.data.answer &&
      this.state.questions.real.data.answer.ID.toString();
    const optionId = this.state.selectedOption;
    if (answerId == undefined) {
      res = true;
    } else {
      res = answerId == optionId;
    }
    this.setState({
      shouldShowProblemOptionTip: !res
    });
    return res;
  }

  /**
   * 供外部调用的获取正确答案
   */
  getRightAnswer() {
    return (
      this.state.questions.real.data.answer &&
      this.state.questions.real.data.answer.content.toString()
    );
  }

  /**
   * 供外部调用的获取用户选择的答案
   */
  getSelectedAnswer() {
    const res =  this.state.questions.real.data.options && this.state.questions.real.data.options.filter(item => item.ID == parseInt(this.state.selectedOption));
    return res[res.length - 1].content.toString()
  }

  render() {
    const isQuestionLoading = this.props.loading.effects[
      "question/getQuestionById"
    ];
    const { data, showRealQuestionTab } = this.props;
    const {
      questions,
      tabList,
      current,
      selectedOption,
      shouldShowProblemOptionTip
    } = this.state;
    return (
      <View className='question-container'>
        <View className='question-explain'>
          <Article sections={data.sections}></Article>
        </View>
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
        >
          <AtTabsPane current={current} index={0}>
            <Skeleton
              animateName='elastic'
              title
              row={2}
              rowWidth={["100%", "50%"]}
              loading={isQuestionLoading}
            >
              <View className='question-item-container'>
                <View className='question-box'></View>
                <Question content={questions.example.data.content}></Question>
              </View>
            </Skeleton>
          </AtTabsPane>
          {showRealQuestionTab ? (
            <AtTabsPane current={current} index={1}>
              <Skeleton
                animateName='elastic'
                title
                row={2}
                rowWidth={["100%", "50%"]}
                loading={isQuestionLoading}
              >
                <View className='question-item-container'>
                  <View className='question-box'></View>
                  <Question content={questions.real.data.content}></Question>
                  {questions.real.data.options &&
                  questions.real.data.options.length > 0 ? (
                    <View className='problem-options-container'>
                      <View className='question-box'></View>
                      <ProblemOptions
                        optionList={questions.real.data.options}
                        onSelect={this.handleProblemOptionSelect.bind(this)}
                        value={selectedOption}
                        showTip={shouldShowProblemOptionTip}
                      ></ProblemOptions>
                    </View>
                  ) : null}
                </View>
              </Skeleton>
            </AtTabsPane>
          ) : null}
        </AtTabs>
      </View>
    );
  }
}
