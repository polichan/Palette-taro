import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

export default class WaveLoading extends Component {
  render() {
    return (
      <View className='wave-loading-container'>
        <View className='circle'>
          <View className='wave'></View>
        </View>
      </View>
    );
  }
}
