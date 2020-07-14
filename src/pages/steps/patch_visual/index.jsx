import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import StepPage from '@/components/StepPage'
import "./index.scss";

export default class PatchVisual extends Component {

  state={}

  render() {
    return (
      <View>
        <StepPage></StepPage>
      </View>
    );
  }
}