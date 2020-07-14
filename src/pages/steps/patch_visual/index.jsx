import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import StepPage from '@/components/StepPage'
import "./index.scss";

export default class PatchVisual extends Component {

  state={}

  handleNextClick(callback)
  {
      callback(true)
  }
  render() {
    return (
      <View>
        <StepPage onNext={this.handleNextClick.bind(this)}></StepPage>
      </View>
    );
  }
}