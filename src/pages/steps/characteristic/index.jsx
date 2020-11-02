import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import Article from "@/components/Article";
import { EIGENVECTOR_EXPLAIN } from "@/constants/explain"
import { getLocalCacheImageSrc } from "@/utils/utils";
import { CDN_IMAGE } from "../../../constants/index";
import "./index.scss";

export default class Characteristic extends Component {
  state = {
    data: {
      sections: [
        EIGENVECTOR_EXPLAIN.content
      ]
    },
    imgs: {
      energyVisualImg: getLocalCacheImageSrc(CDN_IMAGE.ENERGY_VISUAL),
      characteristicVisual: getLocalCacheImageSrc(CDN_IMAGE.CHARACTERISTIC_VISUAL),
      characteristicVisualSecond: getLocalCacheImageSrc(CDN_IMAGE.CHARACTERISTIC_VISUAL_SECOND)
    }
  }
  handleNextClick(callback) {
    callback(true)
  }

  renderImage(img) {
    return <View className='visual-img-container flex flex-direction-column flex-center'>
      <Image src={img}></Image>
    </View>
  }

  render() {
    const { data } = this.state
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} ref={this.refStepPage}>
        <Article sections={data.sections}></Article>
        <View className='visual-container'>
          <View className='flex flex-direction-column'>
            <View className='header flex flex-direction-column'>
              <Text className='header-text'>特征向量可视化</Text>
            </View>
            <View className='bottom flex flex-direction-column'>
              <Text className='bottom-text'>
                将特征值降序排列，对应的特征向量构成的图片如下所示从特征向量的可视化我们可以看出，前面的特征向量是低频信号，能量占比很大，而与越靠近后面能量占比越小，信号越趋于高频（噪声）。
              </Text>
            </View>
            {
              this.renderImage(this.state.imgs.characteristicVisual)
            }
            {
              this.renderImage(this.state.imgs.energyVisualImg)
            }
          </View>
          <View className='flex flex-direction-column'>
          <View className='header flex flex-direction-column'>
              <Text className='header-text'>特征值得能量分布曲线图</Text>
            </View>
          </View>
          <View className='flex flex-direction-column'>
            <View className='bottom flex flex-direction-column'>
              <Text className='bottom-text'>
                特征值的能量累计表示，降序排列的特征值占据了很大的能量，于是我们只用分析能量占据比较大的特征值。
              </Text>
            </View>
          </View>
        </View>
      </StepPage>
    );
  }
}
