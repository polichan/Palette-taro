import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import StepPage from "@/components/StepPage"
import Article from '@/components/Article'
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import './index.scss';

export default class Knn extends Component {

  state = {
    data: {
      title: "K近邻算法（KNN分类器）",
      section: [
        'KNN（K- Nearest Neighbor）法即K最邻近法，最初由 Cover和Hart于1968年提出，是一个理论上比较成熟的方法，也是最简单的机器学习算法之一。该方法的思路非常简单直观：如果一个样本在特征空间中的K个最相似（即特征空间中最邻近）的样本中的大多数属于某一个类别，则该样本也属于这个类别。该方法在定类决策上只依据最邻近的一个或者几个样本的类别来决定待分样本所属的类别。',
        '如此下图，当k=3时，未知样本将会被分类为Class B，当K=7时，未知样本将会被分类为Class A。',
      ]
    },
    imgs: {
      knnImage: getLocalCacheImageSrc(CDN_IMAGE.KNN_IMAGE),
    }
  }

  handleNextClick = (callback) => {
    callback(true)
  }

  handleImageClick = () => {
    const { knnImage } = this.state.imgs
    Taro.previewImage({
      current: knnImage,
      urls: [knnImage]
    })
  }

  render() {
    const { data, imgs } = this.state
    return (
      <StepPage onNext={this.handleNextClick} showPanel>
        <Article sections={data.section}></Article>
        <View className='knn-container flex flex-direction-column flex-center'>
          <Image src={imgs.knnImage} className='knn-image' mode='aspectFit' onClick={this.handleImageClick}></Image>
        </View>
      </StepPage>
    )
  }
}
