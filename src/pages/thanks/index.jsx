import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class Thanks extends Component {

   config = {
       navigationBarTitleText: '感谢测试'
  }

  render() {
    return (
      <View>
        <Text>感谢测试</Text>
      </View>
    );
  }
}