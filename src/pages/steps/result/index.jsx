import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import EmptyData from "@/components/EmptyData";
import Skeleton from "taro-skeleton";
import FormBox from "@/components/FormBox";
import StepPage from "@/components/StepPage";
import { getSrc } from "@/utils/utils";
import "./index.scss";

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class Result extends Component {
  state = {
    result: {},
    resultImg: null,
    noResultData: false
  };

  componentWillMount() {
    this.props
      .dispatch({
        type: "step/submitSteps"
      })
      .then(res => {
        if (res) {
          this.setState({
            result: res.data,
            resultImg: getSrc(res.data.media.cdnUrl)
          });
        } else {
          this.setState({
            noResultData: true
          });
        }
      });
  }

  handleNextClick(callback) {
    callback(true);
  }

  handleResultImgClick() {
    Taro.previewImage({
      current: this.state.resultImg,
      urls: [this.state.resultImg]
    });
  }

  render() {
    const { steps } = this.props.step;
    const isResultLoading = this.props.loading.effects["step/submitSteps"];
    const { result, resultImg, noResultData } = this.state;
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <Skeleton
          animateName='elastic'
          title
          row={5}
          rowWidth={["100%", "80%", "60%", "40%", "20%"]}
          loading={isResultLoading}
        >
          <FormBox label='卷积层数'>
            <Text className='form-box-text'>{steps.numStages}</Text>
          </FormBox>
          <FormBox label='PatchSize'>
            <Text className='form-box-text'>{steps.patchSize}</Text>
          </FormBox>
          <FormBox label='卷积核个数'>
            <Text className='form-box-text'>{steps.block} 个</Text>
          </FormBox>
          <FormBox label='BlockSize'>
            <Text className='form-box-text'>{steps.histBlockSize}</Text>
          </FormBox>
          <FormBox label='准确率'>
            <Text className='form-box-text'>
              {result.accuracy ? result.accuracy : "未知"}
            </Text>
          </FormBox>
          <View className='result-container flex flex-center flex-direction-column'>
            {noResultData ? (
              <EmptyData></EmptyData>
            ) : (
              <Image
                src={resultImg}
                className='result-img'
                onClick={this.handleResultImgClick.bind(this)}
              ></Image>
            )}
          </View>
        </Skeleton>
      </StepPage>
    );
  }
}
