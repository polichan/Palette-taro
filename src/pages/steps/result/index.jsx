import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import EmptyData from "@/components/EmptyData";
import Skeleton from "taro-skeleton";
import FormBox from "@/components/FormBox";
import StepPage from "@/components/StepPage";
import FaceRecognitionErrorRecord from "@/components/FaceRecognitionErrorRecord"
import "./index.scss";

@connect(({ user, step, loading }) => ({
  user,
  step,
  loading
}))
export default class Result extends Component {
  state = {
    result: {},
    noResultData: false,
  };

  componentWillMount() {
    this.getExperimentResult();
  }

  async componentDidMount() {
    await this.endExperiment();
    await this.saveExperimentLog();
  }

  async endExperiment() {
    await this.props
      .dispatch({
        type: "step/endExperiment",
        payload: {
          userExperiment: Object.assign(this.props.step.userExperiment, {
            log: JSON.stringify(this.props.step.stepQueue.exportAll())
          })
        }
      })
      .then(() => { });
  }

  async getExperimentResult() {
    await this.props
      .dispatch({
        type: "step/getExperimentResult"
      })
      .then(res => {
        if (res) {
          this.setState({
            result: res.data,
          });
        } else {
          this.setState({
            noResultData: true
          });
        }
      });
  }

  saveExperimentLog() {
    this.props
      .dispatch({
        type: "step/saveExperimentLog",
        payload: {
          params: this.props.step.userExperiment
        }
      })
      .then(() => {
        Taro.showToast({
          icon: "none",
          title: "提交试验记录成功"
        });
      });
  }

  handleNextClick(callback) {
    callback(true);
  }


  render() {
    const isResultLoading = this.props.loading.effects[
      "step/getExperimentResult"
    ];
    const isSaveExperimentLogLoading = this.props.loading.effects[
      "step/saveExperimentLog"
    ];
    const { result, noResultData } = this.state;
    return (
      <StepPage
        onNext={this.handleNextClick.bind(this)}
        nextButtonLoading={isSaveExperimentLogLoading}
      >
        <Skeleton
          animateName='elastic'
          title
          row={5}
          rowWidth={["100%", "80%", "60%", "40%", "20%"]}
          loading={isResultLoading}
        >
          <FormBox label='卷积层数'>
            <Text className='form-box-text'>{result.convolutionLevel} 层</Text>
          </FormBox>
          <FormBox label='卷积核个数'>
            <Text className='form-box-text'>{result.convolutionKernelNum} 个</Text>
          </FormBox>
          <FormBox label='Patch 大小'>
            <Text className='form-box-text'>{result.patchSize}</Text>
          </FormBox>
          <FormBox label='Block 大小'>
            <Text className='form-box-text'>{result.blockSize}</Text>
          </FormBox>
          <FormBox label='KNN 的 K 值大小'>
            <Text className='form-box-text'>{result.kSize}</Text>
          </FormBox>
          <FormBox label='准确率'>
            <Text className='form-box-text'>
              {result.accuracy ? result.accuracy : "未知"}
            </Text>
          </FormBox>
          <View className='result-container flex flex-direction-column'>
            {noResultData ? (
              <EmptyData></EmptyData>
            ) : (
                <FaceRecognitionErrorRecord data={result.errorRecord}></FaceRecognitionErrorRecord>
              )}
          </View>
        </Skeleton>
      </StepPage>
    );
  }
}
