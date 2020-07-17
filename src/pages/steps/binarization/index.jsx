import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import Article from "@/components/Article";
import { AtAccordion } from "taro-ui";
import "./index.scss";

export default class Binarization extends Component {
  config = {
    navigationBarTitleText: ""
  };

  state = {
    data: {
      title: "什么是二值化？为什么要将二进制转化为十进制？",
      sections: [
        "我们对第二层的每个输出图片都进行二值化处理，得到的结果中只包含一和零（大于等于零的数取1，小于零的数取0），于是就得到了二值化的图，然后将二值化的图片乘以不同的权重（例如：2的七次方等于128，2的六次方64。32，16，8，4，2，1）。将每张图片对应位置的像素值相加，这样得到的图片每个像素都由十进制的值来表示。"
      ]
    },
    exampleOpen: false,
    solutionOpen: false
  };

  handleAccordionOpen(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    const { data, exampleOpen, solutionOpen } = this.state;
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
            <Article title={data.title} sections={data.sections}></Article>
          </AtAccordion>
          <AtAccordion
            open={solutionOpen}
            onClick={this.handleAccordionOpen.bind(this, "solutionOpen")}
            title='实战解答'
          >
            <Article title={data.title} sections={data.sections}></Article>
          </AtAccordion>
        </View>
      </StepPage>
    );
  }
}
