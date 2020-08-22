import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

export default class WaveLoading extends Component {
  static defaultProps = {
    percentage: 80,
    dropColor: "#18bff6",
    percentageColor: 'white'
  };
  render() {
    const { percentage, dropColor, percentageColor } = this.props;
    return (
      <View className='wave-loading-container'>
        <View className='drop' style={{ backgroundColor: dropColor }}></View>
        <View className='drop' style={{ backgroundColor: dropColor }}></View>
        <View className='drop' style={{ backgroundColor: dropColor }}></View>

        <View
          className='collection'
          style={{ backgroundColor: dropColor }}
        ></View>
        <View className='percentage' style={{ color: percentageColor }}>{percentage}%</View>
      </View>
    );
  }
}
