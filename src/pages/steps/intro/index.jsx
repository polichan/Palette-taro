import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Article from '@/components/Article'
import StepPage from "@/components/StepPage"
import './index.scss';

export default class Intro extends Component {
  state = {
    data: {
      title: "数据集的作用",
      section: [
        '在进行机器学习算法之前，通常需要将数据集划分，通常分为训练集和测试集，部分还有验证集。首先介绍这三种数据集的含义：',
        '训练集（Training Set）：帮助我们训练模型，即通过训练集的数据让我们确定拟合曲线的参数。',
        '验证集（Validation Set）：用来做模型选择（model selection），即做模型的最终优化及确定的，用来辅助我们的模型的构建，可选；',
        '测试集（Test Set）： 为了测试已经训练好的模型的精确度。因为在训练模型的时候，参数全是根据现有训练集里的数据进行修正、拟合，有可能会出现过拟合的情况，即这个参数仅对训练集里的数据拟合比较准确，如果出现一个新数据需要利用模型预测结果，准确率可能就会很差。',
        '本数据集总共有100张人脸，有10个不同类别，每个类别有十张照片。其中80张作为训练集，20张作为测试集（随机）。'
      ]
    }
  }

  handleNextClick = (callback) => {
    callback(true)
  }
  render() {
    const { data } = this.state
    return (
      <StepPage onNext={this.handleNextClick} showPanel={false}>
        <View className='intro-container'>
          <Article sections={data.section}></Article>
        </View>
      </StepPage>
    )
  }
}
