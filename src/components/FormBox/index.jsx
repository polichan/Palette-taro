import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

export default class FormBox extends Component {
  static defaultProps = {
    label: "标签",
    colonLabel: true
  };
  state = {};

  render() {
    const { label, colonLabel } = this.props;
    return (
      <View className='form-box'>
        <View className='form-item'>
          <View className='label'>{`${label} ${colonLabel ? ":" : ""}`}</View>
          <View className='info'>
            <View className='info-item'>
              {this.props.children}
              <View className='iconfont icon-right'></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
