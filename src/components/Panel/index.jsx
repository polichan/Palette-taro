import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import './index.scss'

export default class Index extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <View className='panel'>
        <View className='panel__title'><Text>{title}</Text></View>
        <View className='panel__content'>{this.props.children}</View>
      </View>
    );
  }
}
