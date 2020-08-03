import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCheckbox } from "taro-ui";
import "./index.scss";

export default class ProblemOptions extends Component {
  static defaultProps = {
    optionList: [],
    onSelect: (v)=>{v},
    value: []
  };

  state = {
    list: [],
  };

  componentWillMount() {
    this.buildOptions()
  }

  buildOptions(){
    const temp = [];
    this.props.optionList.forEach(element => {
      temp.push({ label: element.content, value: element.ID.toString() });
    });
    this.setState({
      list: temp
    });
  }

  handleChange(value) {
    this.props.onSelect([value[value.length - 1]])
  }

  render() {
    const { value } = this.props
    const { list } = this.state;
    return (
      <View className='problem-options-container'>
        <AtCheckbox
          options={list}
          selectedList={value}
          onChange={this.handleChange.bind(this)}
        />
      </View>
    );
  }
}
