import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class Divider extends Component {
  static defaultProps = {
    text: ""
  };
  render() {
    return (
      <View className='divider_view'>
        <View className='divider_line'></View>
        <View className='divider_context'>
          <Text>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

export default Divider;
