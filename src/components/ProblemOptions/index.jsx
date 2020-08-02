import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtRadio } from "taro-ui";
import "./index.scss";

export default class ProblemOptions extends Component {
  static defaultProps = {
    optionList: []
  };

  state = {
    list: [],
    value: ""
  };

  componentWillMount() {
    const temp = [];
    this.props.optionList.forEach(element => {
      temp.push({ label: element.content, value: element.ID.toString() });
    });
    this.setState({
      list: temp
    });
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    const { list, value } = this.state;
    return (
      <View className='problem-options-container'>
        <Text>请选择答案：</Text>
        <AtRadio
          options={list}
          value={value}
          onClick={this.handleChange.bind(this)}
        />
      </View>
    );
  }
}
