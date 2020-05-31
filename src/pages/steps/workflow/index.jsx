import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  config = {
    navigationBarTitleText: "实验流程"
  };

  render() {
    return <View></View>;
  }
}
