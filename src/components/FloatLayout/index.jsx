import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "./index.scss";

export default class FloatLayout extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  handleClose() {
    this.props.onClose();
  }

  render() {
    const { isOpened, title } = this.props;
    return (
      <AtFloatLayout
        isOpened={isOpened}
        title={title}
        onClose={this.handleClose.bind(this)}
      >
        <View>{this.props.children}</View>
      </AtFloatLayout>
    );
  }
}
