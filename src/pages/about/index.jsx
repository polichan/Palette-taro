import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Article from "../steps/intro/node_modules/@/components/Article";
import NavBar from '../steps/intro/node_modules/@/components/NavBar'

import "./index.scss";

export default class About extends Component {
  state = {
    data: {
      title: "关于本实验",
      sections: [
        "人脸识别是人工智能课程中重要的探索性实验。在实验中要求体现：人脸数据采集、人脸图像的特征提取和分类器的训练及验证。该实验通过人脸识别的实例，引导学生掌握人工智能中数据加载，特征提取（卷积网络），分类器训练和算法性能测试的全过程。",
        "在人工智能课程学习中，学生通过该实验，能够学习数据的采集、数据的预处理、数据的特征提取、分类器的训练和实验数据的测试验证等过程，通过各个环境中的参数设置和对卷积网络和分类器的可视化呈现，生动、直观地展示解算法内部运行机制，帮助学生掌握人工智能识别算法的流程。"
      ]
    }
  };

  config = {
    navigationBarTitleText: "关于本实验"
  };

  render() {
    const { data } = this.state;
    return (
      <View>
        <NavBar background='#fff' back home title='关于本实验' />
        <Article title={data.title} sections={data.sections}></Article>
      </View>
    );
  }
}
