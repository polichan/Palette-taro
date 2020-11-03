import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
@connect(({params, loading}) => ({
  params,
  loading
}))
export default class Params extends Component {
  componentDidMount = () => {
  };
  config = {
    navigationBarTitleText: 'params',
  };
  render() {
    return (
      <View className='params-page'>
        params
      </View>
    )
  }
}
