import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import './index.scss'

export default class Index extends Component {
  state = {};

  componentDidMount() {}

  handleHelpClick()
  {
    this.props.onHelp()
  }
  render() {
    const { title } = this.props;
    return (
      <View className='panel'>
        <View className='panel__title'><Text>{title}</Text><View className='at-icon at-icon-help' onClick={()=>{this.handleHelpClick()}}></View></View>
        <View className='panel__content'>{this.props.children}</View>
      </View>
    );
  }
}
