import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from "@tarojs/redux";
import EmptyData from "@/components/EmptyData";
import Skeleton from "taro-skeleton";
import FormBox from "@/components/FormBox";
import StepPage from "@/components/StepPage";
import {getSrc} from "@/utils/utils";


@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class Result extends Component {

  state = {
    resultImg: null
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'step/submitSteps',
    }).then((res) => {
      this.setState({
        resultImg: getSrc(res.data.media.cdnUrl)
      })
    })
  }

  handleNextClick(callback) {
    callback(false)
  }


  render() {
    const { steps } = this.props.step
    const isResultLoading = this.props.loading.effects['step/submitSteps']
    const { resultImg } = this.state
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <Skeleton
          animateName='elastic'
          title
          row={2}
          rowWidth={["100%", "50%"]}
          loading={isResultLoading}
        >
          <FormBox label="卷积层数">
            <Text className='form-box-text'>{steps.numStages}</Text>
          </FormBox>
          <FormBox label="PatchSize">
            <Text className='form-box-text'>{steps.patchSize}</Text>
          </FormBox>
          <FormBox label="卷积核个数">
            <Text className='form-box-text'>{steps.block} 个</Text>
          </FormBox>
          <FormBox label="BlockSize">
            <Text className='form-box-text'>{steps.histBlockSize}</Text>
          </FormBox>
          <Image src={resultImg}></Image>
        </Skeleton>
      </StepPage>
    );
  }
}