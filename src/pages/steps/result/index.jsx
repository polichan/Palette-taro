import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from "@tarojs/redux";
import StepPage from "@/components/StepPage";

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class Result extends Component {

  state = {}

  componentWillMount() {
    this.props.dispatch({
      type: 'step/submitSteps',
    }).then((res) => {
      console.log(res)
    })
  }

  handleNextClick(callback) {
    callback(false)

  }


  render() {
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>

      </StepPage>
    );
  }
}