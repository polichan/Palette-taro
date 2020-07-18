import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import StepPage from "@/components/StepPage";

export default class Result extends Component {

  state={}

  handleNextClick(callback){
      callback(false)
  }


  render() {
    return (
        <StepPage onNext={this.handleNextClick.bind(this)}>

        </StepPage>
    );
  }
}