import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import _isFunction from "lodash/isFunction";
import { AtButton } from "taro-ui";
import "./index.scss";

export default class ToolBar extends Component {
  static defaultProps = {
    onClick: () => {},
    title: "",
    nextButtonLoading: false,
    nextButtonDisabled: false
  };

  handleOnClick() {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick();
    }
  }

  render() {
    const { title, nextButtonLoading, nextButtonDisabled } = this.props;
    return (
      <View className='tool-bar-wrapper flex flex-direction-column flex-center'>
        <View className='flex flex-direction-column flex-center'>
          <AtButton
            loading={nextButtonLoading}
            disabled={nextButtonDisabled}
            className='c-btn-linergradient-blue common-btn toolbar-btn'
            onClick={this.handleOnClick.bind(this)}
          >
            {nextButtonDisabled ? "加载中.." : title}
          </AtButton>
        </View>
        <View className='safe-area-block-container'></View>
      </View>
    );
  }
}
